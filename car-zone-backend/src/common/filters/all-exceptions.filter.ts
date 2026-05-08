import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
  method: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message, error } = this.getErrorDetails(exception);

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
      method: request.method,
    };

    // Log the error
    this.logError(exception, errorResponse);

    response.status(status).json(errorResponse);
  }

  private getErrorDetails(exception: unknown): {
    status: number;
    message: string | string[];
    error: string;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const response = exceptionResponse as Record<string, unknown>;
        return {
          status,
          message: (response.message as string | string[]) || exception.message,
          error: (response.error as string) || this.getErrorName(status),
        };
      }

      return {
        status,
        message: exception.message,
        error: this.getErrorName(status),
      };
    }

    // Handle Mongoose errors
    if (this.isMongooseError(exception)) {
      return this.handleMongooseError(exception);
    }

    // Handle unknown errors
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
    };
  }

  private isMongooseError(exception: unknown): boolean {
    if (exception && typeof exception === 'object') {
      const error = exception as Record<string, unknown>;
      return (
        error.name === 'CastError' ||
        error.name === 'ValidationError' ||
        error.code === 11000
      );
    }
    return false;
  }

  private handleMongooseError(exception: unknown): {
    status: number;
    message: string | string[];
    error: string;
  } {
    const error = exception as Record<string, unknown>;

    // CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Invalid ${error.path}: ${error.value}`,
        error: 'Bad Request',
      };
    }

    // Duplicate key error
    if (error.code === 11000) {
      const keyValue = error.keyValue as Record<string, unknown>;
      const field = Object.keys(keyValue)[0];
      return {
        status: HttpStatus.CONFLICT,
        message: `${field} already exists`,
        error: 'Conflict',
      };
    }

    // Validation error
    if (error.name === 'ValidationError') {
      const errors = error.errors as Record<string, { message: string }>;
      const messages = Object.values(errors).map((err) => err.message);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: messages,
        error: 'Validation Error',
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Database error',
      error: 'Internal Server Error',
    };
  }

  private getErrorName(status: number): string {
    const errorNames: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
    };
    return errorNames[status] || 'Error';
  }

  private logError(exception: unknown, errorResponse: ErrorResponse): void {
    const { statusCode, path, method } = errorResponse;

    if (statusCode >= 500) {
      this.logger.error(
        `${method} ${path} - ${statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `${method} ${path} - ${statusCode}: ${JSON.stringify(errorResponse.message)}`,
      );
    }
  }
}

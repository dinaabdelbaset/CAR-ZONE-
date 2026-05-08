import { PaginationDto, SortOrder } from '../dto/pagination.dto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

export class PaginationUtil {
  /**
   * Calculate skip value for pagination
   */
  static getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  /**
   * Get sort object for MongoDB queries
   */
  static getSortObject(
    sortBy: string,
    sortOrder: SortOrder,
  ): Record<string, 1 | -1> {
    return { [sortBy]: sortOrder === SortOrder.ASC ? 1 : -1 };
  }

  /**
   * Build pagination options from DTO
   */
  static getPaginationOptions(dto: PaginationDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const sortBy = dto.sortBy || 'createdAt';
    const sortOrder = dto.sortOrder || SortOrder.DESC;

    return {
      skip: this.getSkip(page, limit),
      limit,
      sort: this.getSortObject(sortBy, sortOrder),
      page,
    };
  }

  /**
   * Build paginated response
   */
  static paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResult<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}

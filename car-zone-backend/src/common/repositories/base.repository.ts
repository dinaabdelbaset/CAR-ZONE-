import {
  FilterQuery,
  Model,
  UpdateQuery,
  QueryOptions,
  Document,
} from 'mongoose';

/**
 * T = Document type (e.g., CarDocument)
 * TCreate = DTO type for create operations (e.g., CreateCarDto)
 * TUpdate = DTO type for update operations (e.g., UpdateCarDto)
 *
 */
export type TDocument<T> = T & Document;
export abstract class BaseRepository<
  T,
  TCreate = Partial<T>,
  TUpdate = Partial<T>,
> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(data: TCreate): Promise<T> {
    const created = new this.entityModel(data as unknown as T);
    const saved = await created.save();
    return saved as T;
  }

  async findOne(
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel.findOne(filter, projection, options).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.entityModel.findById(id).exec();
  }

  async findAll(
    filter: FilterQuery<T> = {},
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T[]> {
    return this.entityModel.find(filter, projection, options).exec();
  }

  async findWithPagination(
    filter: FilterQuery<T>,
    skip: number,
    limit: number,
    sort: Record<string, 1 | -1>,
  ): Promise<T[]> {
    return this.entityModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.entityModel.countDocuments(filter).exec();
  }

  async update(id: string, data: TUpdate): Promise<T | null> {
    return this.entityModel
      .findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true })
      .exec();
  }

  async updateOne(filter: FilterQuery<T>, data: TUpdate): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate(filter, data as UpdateQuery<T>, { new: true })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.entityModel.findByIdAndDelete(id).exec();
  }

  async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOneAndDelete(filter).exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount?: number }> {
    return this.entityModel.deleteMany(filter).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.exists(filter);
    return result !== null;
  }

  async distinct<K extends keyof T>(field: K): Promise<T[K][]> {
    return this.entityModel.distinct(field as string).exec() as Promise<T[K][]>;
  }
}

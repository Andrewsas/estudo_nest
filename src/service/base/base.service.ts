import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseDto } from 'src/dto/base.dto';

export abstract class BaseService<TModel extends BaseDto> {
  constructor(
    public model: Model<any>,
    public dto: new (data: any, all?: boolean) => TModel,
  ) {}

  public async getAll(data?: TModel): Promise<TModel[]> {
    const result = await (data ? this.model.find(data) : this.model.find());
    return result.map((r) => new this.dto(r));
  }

  public async getOne(uuid: string): Promise<TModel> {
    const result = await this.model.findById(uuid);
    if (!result) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'register_not_found' },
        HttpStatus.FORBIDDEN,
      );
    }
    return new this.dto(result);
  }

  public async create(data: TModel): Promise<TModel> {
    return await this.model.create(data);
  }

  public async update(uuid: string, data: TModel): Promise<void> {
    const result = await this.model.findById(uuid);
    if (!result) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'register_not_found' },
        HttpStatus.FORBIDDEN,
      );
    }
    return await result.update(data);
  }

  public async remove(uuid: string): Promise<void> {
    const result = await this.model.findById(uuid);
    if (!result) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'register_not_found' },
        HttpStatus.FORBIDDEN,
      );
    }
    return await result.remove();
  }
}

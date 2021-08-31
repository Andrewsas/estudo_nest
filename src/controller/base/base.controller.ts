import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { BaseDto } from 'src/dto/base.dto';
import { UserToken } from 'src/utils/user-token.decorator';
import { BaseService } from 'src/service/base/base.service';

@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not found.' })
@ApiResponse({ status: 500, description: 'Internal Serve Error.' })
export abstract class BaseController<TModel extends BaseDto> {
  constructor(
    private baseService: BaseService<TModel>,
    public modelType: { new (...args: any): TModel },
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All' })
  @ApiResponse({ status: 200, description: 'Request success.' })
  public async index(@Query() data: TModel, @UserToken() user_uuid: string) {
    return this.baseService.getAll(data);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get One' })
  @ApiResponse({ status: 200, description: 'Request success.' })
  public show(@Param('uuid') uuid: string) {
    try {
      const obj = this.baseService.getOne(uuid);
      return new this.modelType(obj, true);
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'This is a custom message' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create' })
  @ApiBody({
    required: true,
    description: 'Add the fields to be save',
  })
  @ApiResponse({ status: 201, description: 'Create success.' })
  public create(@Body() data: TModel) {
    return this.baseService.create(data);
  }

  @Put()
  @ApiOperation({ summary: 'Update' })
  @ApiBody({ required: true, description: 'Add the fields to be update' })
  @ApiResponse({ status: 204, description: 'Update success.' })
  public edit(@Body() data: TModel) {
    return this.baseService.create(data);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remove' })
  @ApiResponse({ status: 204, description: 'Delete success.' })
  public remove(@Param('uuid') uuid: string) {
    return this.baseService.getOne(uuid);
  }
}

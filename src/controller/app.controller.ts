import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';

import { AppDto } from '../dto/app.dto';
import { AppService } from '../service/app.service';
import { BaseController } from './base/base.controller';
import { UserToken } from 'src/utils/user-token.decorator';

@Controller('')
@ApiBearerAuth()
export class AppController extends BaseController<AppDto> {
  constructor(private readonly appService: AppService) {
    super(appService, AppDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All' })
  @ApiResponse({ status: 200, description: 'Request success.', type: [AppDto] })
  public async index(@Query() data: AppDto, @UserToken() user_uuid: string) {
    return super.index(data, user_uuid);
  }

  @Post()
  @ApiOperation({ summary: 'Create' })
  @ApiBody({
    required: true,
    description: 'Add the fields to be save',
    type: AppDto,
  })
  public create(@Body() data: AppDto) {
    return super.create(data);
  }

  @Put()
  @ApiOperation({ summary: 'Update' })
  @ApiBody({
    required: false,
    type: AppDto,
    description: 'Add the fields to be update',
  })
  public edit(@Body() data: AppDto) {
    return super.edit(data);
  }
}

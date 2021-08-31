import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AppDto } from '../dto/app.dto';
import { App, AppDocument } from '../model/app';

import { BaseService } from './base/base.service';

@Injectable()
export class AppService extends BaseService<AppDto> {
  constructor(@InjectModel(App.name) public appModel: Model<AppDocument>) {
    super(appModel, AppDto);
  }
}

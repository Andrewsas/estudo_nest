import { BaseDto } from './base.dto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AppDto extends BaseDto {
  @ApiProperty()
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  age: number;

  @ApiProperty()
  @ApiPropertyOptional()
  breed: string;

  constructor(data?: any, detail?: boolean) {
    super(data);
  }
}

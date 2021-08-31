import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  @ApiPropertyOptional()
  public uuid: string;

  constructor(data?: any) {
    if (data && data?._id) {
      this.uuid = data?._id as string;
    }
  }
}

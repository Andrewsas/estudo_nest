import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserToken = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request.headers['authorization'];
  },
);

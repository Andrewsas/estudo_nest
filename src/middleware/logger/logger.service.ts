import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      console.log('Request...', res.status);
      next();
    }
}

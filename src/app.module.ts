import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { App, AppSchema } from './model/app';
import { AppController } from './controller/app.controller';

import { AppService } from './service/app.service';
import { AuthGuard } from './middleware/guard/auth.guard';
import { LoggerService } from './middleware/logger/logger.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:49153/nest'),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerService).forRoutes('/');
  }
}

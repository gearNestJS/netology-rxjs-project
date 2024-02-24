import { Module } from '@nestjs/common';
import { RxjsController } from './rxjs.controller';
import { RxjsService } from './services';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RxjsController],
  providers: [RxjsService]
})
export class RxjsModule {}

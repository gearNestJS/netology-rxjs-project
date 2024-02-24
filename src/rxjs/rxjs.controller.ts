import { Controller, Get, Param } from '@nestjs/common';
import { RxjsService } from './services';

@Controller()
export class RxjsController {
  constructor(private readonly _rxjsService: RxjsService) {}

  @Get('github/:text')
  async searchGitHub(@Param('search') search: string): Promise<unknown> {
    return this._rxjsService.searchGitHub(search);
  }

  @Get('bitcoin')
  async getBitcoinPrice(): Promise<unknown> {
    return this._rxjsService.getBitcoinPriceUSD();
  }
}

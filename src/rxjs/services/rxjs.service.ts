import { Injectable } from '@nestjs/common';
import { firstValueFrom, from, map, mergeAll, Observable, take, toArray } from 'rxjs';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RxjsService {

  constructor(private readonly http: HttpService) {}

  async searchGitHub(search: string): Promise<unknown> {
    const data$ = this._getGitHubData(search, 10).pipe(toArray());
    data$.subscribe(() => {});

    return await firstValueFrom(data$);
  }

  async getBitcoinPriceUSD() {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

    return this.http
      .get(url)
      .pipe(
        map((res: { data: { bpi: unknown } }) => res.data?.bpi),
        map((bpi: { USD: unknown }) => bpi?.USD),
        map((usd: { rate: unknown }) => {
          return usd?.rate;
        }),
      );
  }
  private _getGitHubData(search: string, count: number): Observable<unknown> {
    const url = 'https://api.github.com/search/repositories?q=';

    return from(axios.get(`${url}${search}`))
      .pipe(map((res: any) => res.data.items), mergeAll())
      .pipe(take(count));
  }
}

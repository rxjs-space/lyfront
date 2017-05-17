import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class TitlesResolverService {

  constructor(private data: DataService) { }
  resolve() {
    return this.data.titlesRx;
  }
}

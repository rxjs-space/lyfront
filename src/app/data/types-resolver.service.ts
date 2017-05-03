import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';


@Injectable()
export class TypesResolverService {

  constructor(private data: DataService) { }
  resolve() {
    return this.data.types;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class DismantlingOrdersByVINResolverService {

  constructor(private data: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const vin = route.params['id'];
    return this.data.getDismantlingOrdersByVIN(vin);
  }
}

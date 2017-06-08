import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class VehicleResolverService {

  constructor(private data: DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.data.getVehicleByVIN(id);
  }
}

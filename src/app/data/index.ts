import { DataService } from './data.service';
import { TypesResolverService } from './types-resolver.service';
import { VehicleResolverService } from './vehicle-resolver.service';
import { TitlesResolverService } from './titles-resolver.service';
import { DismantlingOrdersByVINResolverService } from './dismantling-orders-by-vin-resolver.service';


export const dataServices = [
  DataService,
  TypesResolverService,
  VehicleResolverService,
  TitlesResolverService,
  DismantlingOrdersByVINResolverService
];


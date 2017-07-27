export class DismantlingOrder {
  orderDate: string = (new Date()).toISOString().slice(0, 10);
  isAdHoc: boolean = false;
  correspondingSalesOrderId: any = '';
  startedAt: string = '';
  completedAt: string = '';
  vin: string = '';
  vehicleType: string = '';
  partsAndWastes: any[] = [];
  planners: any[] = [];
  productionOperators: any[] = [];
}


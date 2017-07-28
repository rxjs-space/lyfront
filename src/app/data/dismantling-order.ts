export class DismantlingOrder {
  _id: any;
  orderDate: string = (new Date()).toISOString().slice(0, 10);
  isAdHoc: boolean = false;
  noItemToRecycle: boolean = false;
  orderType = '';
  correspondingSalesOrderId: any = '';
  startedAt: string = '';
  completedAt: string = '';
  vin: string = '';
  vehicleType: string = '';
  planners: any[] = [];
  productionOperators: any[] = [];
  partsAndWastesPP: any[] = []; // plan and production
}


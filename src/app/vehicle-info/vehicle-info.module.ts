import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ShowVehicleDetailsComponent } from './show-vehicle-details/show-vehicle-details.component';
import { DetailsVehicleComponent } from './details-vehicle/details-vehicle.component';
import { DetailsGeneralComponent } from './details-general/details-general.component';
import { DetailsOwnerAgentComponent } from './details-owner-agent/details-owner-agent.component';
import { DetailsDocsComponent } from './details-docs/details-docs.component';
import { DetailsConditionRvFdComponent } from './details-condition-rv-fd/details-condition-rv-fd.component';
import { DialogFdComponent } from './dialog-fd/dialog-fd.component';
import { DetailsPhotosComponent } from './details-photos/details-photos.component';
import { DetailsStatusComponent } from './details-status/details-status.component';
import { DetailsRemarksComponent } from './details-remarks/details-remarks.component';
import { DialogRemarkComponent } from './dialog-remark/dialog-remark.component';
import { DialogBrandComponent } from './dialog-brand/dialog-brand.component';
import { DetailsVehicleCostsComponent } from './details-vehicle-costs/details-vehicle-costs.component';
import { DialogVehicleCostsComponent } from './dialog-vehicle-costs/dialog-vehicle-costs.component';

@NgModule({
  imports: [
    SharedModule,
    VehicleInfoRoutingModule
  ],
  declarations: [
    ShowComponent,
    ListComponent,
    HomeComponent,
    ShowVehicleDetailsComponent,
    DetailsVehicleComponent,
    DetailsGeneralComponent,
    DetailsOwnerAgentComponent,
    DetailsDocsComponent,
    DetailsConditionRvFdComponent,
    DialogFdComponent,
    DetailsPhotosComponent,
    DetailsStatusComponent,
    DetailsRemarksComponent,
    DialogRemarkComponent,
    DialogBrandComponent,
    DetailsVehicleCostsComponent,
    DialogVehicleCostsComponent
  ],
  entryComponents: [
    DialogFdComponent,
    DialogRemarkComponent,
    DialogVehicleCostsComponent,
    DialogBrandComponent
  ]
})
export class VehicleInfoModule { }

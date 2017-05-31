import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ShowVehicleDetailsComponent } from './show-vehicle-details/show-vehicle-details.component';
import { NewVehicleDetailsComponent } from './new-vehicle-details/new-vehicle-details.component';
import { DetailsVehicleComponent } from './details-vehicle/details-vehicle.component';
import { DetailsGeneralComponent } from './details-general/details-general.component';
import { DetailsOwnerAgentComponent } from './details-owner-agent/details-owner-agent.component';
import { DetailsDocsComponent } from './details-docs/details-docs.component';
import { DetailsConditionRvFdComponent } from './details-condition-rv-fd/details-condition-rv-fd.component';
import { DialogFdComponent } from './dialog-fd/dialog-fd.component';
import { DetailsPhotosComponent } from './details-photos/details-photos.component';

@NgModule({
  imports: [
    SharedModule,
    VehicleInfoRoutingModule
  ],
  declarations: [
    NewComponent,
    ShowComponent,
    ListComponent,
    HomeComponent,
    ShowVehicleDetailsComponent,
    NewVehicleDetailsComponent,
    DetailsVehicleComponent,
    DetailsGeneralComponent,
    DetailsOwnerAgentComponent,
    DetailsDocsComponent,
    DetailsConditionRvFdComponent,
    DialogFdComponent,
    DetailsPhotosComponent
  ],
  entryComponents: [
    DialogFdComponent
  ]
})
export class VehicleInfoModule { }

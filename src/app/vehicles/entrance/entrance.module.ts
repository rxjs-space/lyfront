import { NgModule } from '@angular/core';
import { EntranceHomeComponent } from './entrance-home/entrance-home.component';
import { EntranceRoutingModule } from './entrance-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EntranceReportsComponent } from './entrance-reports/entrance-reports.component';

@NgModule({
  imports: [
    SharedModule,
    EntranceRoutingModule
  ],
  declarations: [EntranceHomeComponent, EntranceReportsComponent]
})
export class EntranceModule { }

import { NgModule } from '@angular/core';
import { EntranceHomeComponent } from './entrance-home/entrance-home.component';
import { EntranceRoutingModule } from './entrance-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EntranceReportsComponent } from './entrance-reports/entrance-reports.component';
import { EntranceReportsLastFiveWeeksComponent } from './entrance-reports-last-five-weeks/entrance-reports-last-five-weeks.component';

@NgModule({
  imports: [
    SharedModule,
    EntranceRoutingModule
  ],
  declarations: [EntranceHomeComponent, EntranceReportsComponent, EntranceReportsLastFiveWeeksComponent]
})
export class EntranceModule { }

import { NgModule } from '@angular/core';
import { EntranceHomeComponent } from './entrance-home/entrance-home.component';
import { EntranceRoutingModule } from './entrance-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EntranceRoutingModule
  ],
  declarations: [EntranceHomeComponent]
})
export class EntranceModule { }

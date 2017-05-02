import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {path: '', component: ListComponent, pathMatch: 'full'},
  {path: 'new', component: NewComponent},
  {path: ':vin', component: ShowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleInfoRoutingModule { }

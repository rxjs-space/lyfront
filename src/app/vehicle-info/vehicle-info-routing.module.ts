import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
/*
  TypesResolverService is provided at app.module
*/
import { TypesResolverService } from '../data/types-resolver.service';
import { VehicleResolverService } from '../data/vehicle-resolver.service';
import { TitlesResolverService } from '../data/titles-resolver.service';


const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'new', component: NewComponent},
    {path: 'list', component: ListComponent},
    {path: ':id', resolve: {
      types: TypesResolverService,
      vehicle: VehicleResolverService,
      titles: TitlesResolverService
      }, component: ShowComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleInfoRoutingModule { }

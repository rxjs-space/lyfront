import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/auth.guard';

/*
  TypesResolverService is provided at app.module
*/
import { TypesResolverService } from '../data/types-resolver.service';
import { VehicleResolverService } from '../data/vehicle-resolver.service';
import { TitlesResolverService } from '../data/titles-resolver.service';
import { DismantlingOrdersByVINResolverService } from '../data/dismantling-orders-by-vin-resolver.service';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], /*resolve: {
      types: TypesResolverService,
      titles: TitlesResolverService,
    }, */component: HomeComponent, children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    // {path: '', component: ListComponent, pathMatch: 'full'},
    {path: 'new', component: NewComponent},
    {path: 'list', component: ListComponent},
    {path: ':id', /*resolve: {
      vehicle: VehicleResolverService,
      dismantlingOrders: DismantlingOrdersByVINResolverService
      },*/ component: ShowComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleInfoRoutingModule { }

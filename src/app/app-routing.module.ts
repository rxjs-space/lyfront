import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';

/*

  default route to login, if logged in, turn to dashboard
  childModules: 
    vehicle-info(prepare application form, prepare mofcom form, prepare log), 
    dismantling-order,
    survey-order,
    part-order,
    part-inventory,
    part-pricing,
    admin


*/

const routes: Routes = [
  { path: '', children: [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'admin',
      canLoad: [AuthGuard],
      loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'dashboard',
      canLoad: [AuthGuard],
      loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
    { path: 'vehicles',
      canLoad: [AuthGuard],
      loadChildren: 'app/vehicles/vehicles.module#VehiclesModule' },
    { path: 'dismantling',
      canLoad: [AuthGuard],
      loadChildren: 'app/vehicles/dismantling/dismantling.module#DismantlingModule' },
    { path: 'inventory',
      canLoad: [AuthGuard],
      loadChildren: 'app/inventory/inventory.module#InventoryModule' },
    { path: 'sales',
      canLoad: [AuthGuard],
      loadChildren: 'app/sales/sales.module#SalesModule' },
      // loadChildren: 'app/vehicle-info/vehicle-info.module#VehicleInfoModule' },
    { path: '**', component: NotFoundComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


// const appRoutes: Routes = [
//   {
//     path: 'compose',
//     component: ComposeMessageComponent,
//     outlet: 'popup'
//   },
//   {
//     path: 'admin',
//     loadChildren: 'app/admin/admin.module#AdminModule',
//     canLoad: [AuthGuard]
//   },
//   {
//     path: 'crisis-center',
//     loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
//     data: { preload: true }
//   },
//   { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
// ];

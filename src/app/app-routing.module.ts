import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnmdComponent } from './learnmd/learnmd/learnmd.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';


/*

  default route to login, if logged in, turn to dashboard
  childModules: 
    vehicle-info(prepare application form, prepare mofcom form, prepare log), 
    dismantling-plan,
    survey-plan,
    part-order,
    part-inventory,
    admin


*/

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'vehicles', loadChildren: 'app/vehicle-info/vehicle-info.module#VehicleInfoModule', canLoad: [ AuthGuard ] },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
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

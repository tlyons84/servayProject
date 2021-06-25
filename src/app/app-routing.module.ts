import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {loginComponent} from "./Components/login/login.component";
import {landingPageComponent} from "./Components/landing-page/landing-page.component";
import { AuthGuardService } from '../app/Components/authentication/authentication-guard.service' ;
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path:'', component:landingPageComponent, pathMatch:'full'},

  //   {
//     path: '',
//     component: AppComponent,
//     canActivate: [AuthGuardService],
//     canActivateChild: [AuthGuardService],
//     children: [
//       {
//         path: '',
//         component: landingPageComponent,
//         data: { title: 'Comet' }
//       },
//       {
//         path: 'login',
//         component: loginComponent,
//       },
//       {
//         path: 'home',
//         component: landingPageComponent,
//       },
//
//       // Fallback when no prior route is matched
//       { path: '**', redirectTo: 'login', pathMatch: 'full' }
//     ]
//   },
//
 ];

export const  AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
});

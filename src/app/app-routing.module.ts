import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {DashboardComponent} from "./main/dashboard/dashboard.component";


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'main',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: '',
    component: DashboardComponent
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }]
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'prefix'
}, {
  path: '**',
  redirectTo: 'login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

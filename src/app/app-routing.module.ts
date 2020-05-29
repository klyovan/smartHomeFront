import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {ReportsComponent} from './reports/reports.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {RoomComponent} from './room/room.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent , canActivate: [AdminGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'reports/:id', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'room', component: RoomComponent, canActivate: [AuthGuard]},
  {path: 'room/:id', component: ControlPanelComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ReportsComponent } from './reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { RoomComponent } from './room/room.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { GuardComponent } from './guard/guard.component';


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: process.env.BROKER_HOSTNAME,
  port: 8000,
  path: '/mqtt'
};


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ReportsComponent,
    ControlPanelComponent,
    RoomComponent,
    RoomFormComponent,
    SensorFormComponent,
    ConfirmDeleteComponent,
    GuardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ChartsModule,
    MatSlideToggleModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  entryComponents: [RoomFormComponent, ConfirmDeleteComponent, SensorFormComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';


import { AgmCoreModule } from '@agm/core';
import { ViewmapComponent } from './pages/viewmap/viewmap.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MapComponent,
    NavbarComponent,
    ViewmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDea3f_x33GP65X7Qf2PO0aB22eMgn48II'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

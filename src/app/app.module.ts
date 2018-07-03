import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PeopleService } from './people.service';
import { MarkerComponent } from './marker/marker.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app.routing-module';
import { HeaderComponent } from './header/header.component';
import { PersonCardComponent } from './person-card/person-card.component';

@NgModule({
  declarations: [AppComponent, MarkerComponent, MapComponent, HeaderComponent, PersonCardComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [PeopleService],
  bootstrap: [AppComponent],
})
export class AppModule {}

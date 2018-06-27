import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PeopleService } from './people.service';
import { MarkerComponent } from './marker/marker.component';

@NgModule({
  declarations: [AppComponent, MarkerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PeopleService],
  bootstrap: [AppComponent],
})
export class AppModule {}

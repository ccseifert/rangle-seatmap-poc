import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PeopleService } from './people.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule],
  providers: [PeopleService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { MarkerComponent } from './components/marker/marker.component';
import { MapComponent } from './components/map/map.component';
import { AppRoutingModule } from './app.routing-module';
import { HeaderComponent } from './components/header/header.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { SearchComponent } from './components/search/search.component';
import { UserImageComponent } from './components/user-image/user-image.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkerComponent,
    MapComponent,
    HeaderComponent,
    PersonCardComponent,
    SearchComponent,
    UserImageComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

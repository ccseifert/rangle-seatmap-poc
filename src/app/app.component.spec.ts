import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkerComponent } from './marker/marker.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { SearchComponent } from './search/search.component';
import { UserImageComponent } from './user-image/user-image.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { AppRoutingModule } from './app.routing-module';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { BrowserModule } from '../../node_modules/@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MarkerComponent,
        MapComponent,
        HeaderComponent,
        PersonCardComponent,
        SearchComponent,
        UserImageComponent
      ],
      providers: [DataService, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'Welcome to rangleseatmappoc!',
  //   );
  // }));
});

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/6th-floor', pathMatch: 'full' },
  { path: '5th-floor', component: MapComponent },
  { path: '6th-floor', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { InfoComponent } from './components/info/info.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'reservation', pathMatch: 'full' },
  { path: 'reservation', component: ReservationFormComponent },
  { path: 'history', component: ReservationHistoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

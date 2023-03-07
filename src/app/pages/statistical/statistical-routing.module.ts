import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticalComponent } from './statistical.component';

const statisticalRoutes: Routes = [
  // { path: 'thang', component: StatisticalComponent },
  // { path: 'quy', component: StatisticalComponent },
  // { path: 'nam', component: StatisticalComponent },
  { path: '', component: StatisticalComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(statisticalRoutes)],
  exports: [RouterModule],
})
export class StatisticalRoutingModule {}

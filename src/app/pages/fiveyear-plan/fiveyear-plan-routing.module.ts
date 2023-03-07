import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiveyearPlanComponent } from './fiveyear-plan.component';

const routes: Routes = [{ path: '', component: FiveyearPlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiveyearPlanRoutingModule { }

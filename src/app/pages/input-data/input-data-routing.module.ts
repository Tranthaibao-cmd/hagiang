import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputDataComponent } from './input-data.component'

const inputDataRoutes: Routes = [
  {path: '', component: InputDataComponent },
  // { path: 'thang', component: InputDataComponent },
  // { path: 'quy', component: InputDataComponent },
  // // { path: 'nua-nam', component: InputDataComponent },
  // { path: 'nam', component: InputDataComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(inputDataRoutes)],
  exports: [RouterModule],
})
export class InputDataRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionTableComponent } from './position-table.component';


const positionTableRoutes: Routes = [
  { path: '', component: PositionTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(positionTableRoutes)],
  exports: [RouterModule],
})
export class PositionTableRoutingModule {}

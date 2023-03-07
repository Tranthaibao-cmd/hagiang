import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputHistoryComponent } from './input-history.component';

const routes: Routes = [{ path: '', component: InputHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputHistoryRoutingModule {}

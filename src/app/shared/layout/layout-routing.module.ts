import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/interceptor/auth.guard';
import { LayoutComponent } from './layout.component';
const layoutRoutes: Routes = [
  {
    path: 'nhap-lieu',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/input-data/input-data.module').then(
        (m) => m.InputDataModule
      ),
  },
  {
    path: 'thong-ke',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/statistical/statistical.module').then(
        (m) => m.StatisticalModule
      ),
  },
  {
    path: 'cau-hinh',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'bao-cao-huyen',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/periodic-report/periodic-report.module').then(
        (m) => m.PeriodicReportModule
      ),
  },
  {
    path: 'bao-cao-tong-hop',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/synthesis-report/synthesis-report.module').then(
        (m) => m.SynthesisReportModule
      ),
  },
  // {
  //   path: 'bao-cao',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('../../pages/High-report/high-report.module').then(
  //       (m) => m.TestReportModule
  //     ),
  // },
  {
    path: 'lich-su-nhap-lieu',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/input-history/input-history.module').then(
        (m) => m.InputHistoryModule
      ),
  },
  {
    path: 'lich-su-bao-cao',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/report-history/report-history.module').then((m) => m.ReportHistoryModule),
  },
  {
    path: 'thoi-gian-nhap-lieu',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/input-time/input-time.module').then(
        (m) => m.InputTimeModule
      ),
  },
  {
    path: 'du-bao',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/predict/predict.module').then((m) => m.PredictModule),
  },
  // {
  //   path: 'grdp',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('../../pages/input-grdp/input-grdp.module').then(
  //       (m) => m.InputGrdpModule
  //     ),
  // },

  {
    path: 'ke-hoach',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/input-plan/input-plan.module').then(
        (m) => m.InputPlanModule
      ),
  },
  {
    path: 'ke-hoach-5-nam',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/fiveyear-plan/fiveyear-plan.module').then((m)=> m.FiveyearPlanModule
      ),
  },
  {
    path: 'chi-tieu-nam',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/config-indi-year/config-indi-year.module').then(
        (m) => m.ConfigIndiYearModule
      ),
  },
  {
    path: 'thong-tin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/info/info.module').then((m) => m.InfoModule),
  },
  {
    path: 'doi-mat-khau',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../pages/change-pass/change-pass.module').then(
        (m) => m.ChangePassModule
      ),
  },
  {
    path: '**',
    redirectTo: 'nhap-lieu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

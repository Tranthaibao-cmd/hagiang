import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config.component';

const configRoutes: Routes = [
  {
    path: 'dau-vao',
    component: ConfigComponent,
    loadChildren: () =>
      import(
        '@features/table/config-input-table/config-input-table.module'
      ).then((m) => m.ConfigInputTableModule),
  },
  {
    path: 'nguoi-dung',
    component: ConfigComponent,
    loadChildren: () =>
      import('@features/table/config-user-table/config-user-table.module').then(
        (m) => m.ConfigUserTableModule
      ),
  },
  {
    path: 'nhom-nguoi-dung',
    component: ConfigComponent,
    loadChildren: () =>
      import(
        '@features/table/config-user-group-table/config-user-group-table.module'
      ).then((m) => m.ConfigUserGroupTableModule),
  },
  // {
  //   path: 'grdp',
  //   component: ConfigComponent,
  //   loadChildren: () =>
  //     import('@features/table/config-grdp-table/config-grdp-table.module').then(
  //       (m) => m.ConfigGRDPTableModule
  //     ),
  // },
  {
    path: 'phong',
    component: ConfigComponent,
    loadChildren: () =>
      import('@features/table/config-district-table/config-district-table.module').then(
        (m) => m.ConfigDistrictTableModule
      ),
  },
  {
    path: 'chuc-vu',
    component: ConfigComponent,
    loadChildren: () =>
      import('@features/table/position-table/position-table.module').then(
        (m) => m.PositionTableModule
      ),
  },
  {
    path: 'don-vi-tinh',
    component: ConfigComponent,
    loadChildren: () =>
      import('@features/table/config-unit-table/config-unit-table.module').then(
        (m) => m.ConfigUnitTableModule
      ),
  },
  {
    path: 'tai-nguyen',
    component: ConfigComponent,
    loadChildren: () =>
      import(
        '@features/table/config-resources-table/config-resources-table.module'
      ).then((m) => m.ConfigResourcesTableModule),
  },

  {
    path: 'nhom-chi-tieu',
    component: ConfigComponent,
    loadChildren: () =>
      import(
        '@features/table/config-indicator-group-table/config-indicator-group-table.module'
      ).then((m) => m.ConfigIndicatorGroupTableModule),
  },
  {
    path: 'chi-tieu',
    component: ConfigComponent,
    loadChildren: () =>
      import(
        '@features/table/config-indicators-table/config-indicators-table.module'
      ).then((m) => m.ConfigIndicatorsTableModule),
  },
  {
    path: '**',
    redirectTo: 'dau-vao',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(configRoutes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}

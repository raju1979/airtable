import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { WorkbookComponent } from './components/workbook/workbook.component';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/workspaces'
      },
      {
        path: 'workspaces',
        component: WorkspacesComponent
      },
      {
        path: 'workbook/:id',
        component: WorkbookComponent
      },
      {
        path: 'workbook',
        pathMatch: 'full',
        component: WorkspacesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
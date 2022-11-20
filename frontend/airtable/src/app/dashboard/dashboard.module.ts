import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';
import { AngularSplitModule } from 'angular-split';

import { WorkbookComponent } from './components/workbook/workbook.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    WorkspacesComponent,
    WorkbookComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    RippleModule,
    SplitterModule,
    CardModule,
    AngularSplitModule,
    TabViewModule
  ]
})
export class DashboardModule { }

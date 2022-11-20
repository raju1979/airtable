import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent {

  workspaces: Array<any> = [];

  constructor(private apiService: ApiService) {
    this.getWorkspaces();
  }

  getWorkspaces() {
    this.apiService.getData('workspaces')
      .subscribe(
        res => {
          
          this.workspaces = res;
          this.getWorkbooks()
          console.log(this.workspaces)
        }
      )
  }

  addWorkbook(workspace: any) {
    console.log(workspace);
    const newWorkbook = {
      _id: uuidv4(),
      title: faker.name.firstName(),
      worksheets: [],
      workspace: workspace.id
    }
    console.log(newWorkbook);
    this.apiService.postData('workbooks', newWorkbook)
      .subscribe(
        res => {
          console.log(res);
          this.getWorkbooks();
        }
      )
  }

  getWorkbooks() {
    this.apiService.getData('workbooks')
      .subscribe(
        res => {
          
          const tempWorkbooksObj = {};
          this.workspaces.map(item => item.workbooks = [])
          res.map((workbook: any) => {
            const worskspace = workbook.workspace
            
            const tempWorkspace  = this.workspaces.filter(item => item.id === worskspace)[0];
            console.log(tempWorkspace)
            tempWorkspace.workbooks.push(workbook)
          })
          console.log(this.workspaces)
        }
      )
  }
}

import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { isNgTemplate } from '@angular/compiler';
import { iconsArray } from './icons';
@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent {

  workspaces: Array<any> = [];

  iconArray = iconsArray;

  constructor(private apiService: ApiService) {
    this.getWorkspaces();
  }

  getWorkspaces() {
    this.apiService.getData('workspaces/list', '?page=1&perPage=20&sort=createdAt%40desc&isActive=true')
      .subscribe(
        res => {
          
          this.workspaces = res.data;
          // this.getWorkbooks()
          console.log(this.workspaces)
        }
      )
  }

  getWorkspaceById(id: string) {
    this.apiService.getData(`workspaces/get/${id}`)
      .subscribe(
        res => {         
          
          console.log('edited data', res)
        }
      )
  }

  addWorkbook(workspace: any) {
    console.log(workspace);
    const newWorkbook = {
      title: faker.name.firstName(),
      worksheets: [],
      workspaces: workspace._id,
      isActive: true,
      "properties": {
        "icon": this.getRandomIcon()
    }
    }
    console.log(newWorkbook);
    this.apiService.postData('workbooks/create', newWorkbook)
      .subscribe(
        res => {
          console.log(res);
          this.getWorkbooks(workspace);
        }
      )
  }

  getWorkbooks(workspace: any) {
    console.log('wordsafdds', workspace)
    this.apiService.getData(`workspaces/get/${workspace._id}`, '')
      .subscribe(
        res => {
          workspace.workbooks = [];
          console.log('ress ', res)
          const tempWorkbooksObj = {};
          // this.workspaces.map(item => item.workbooks = [])
          // res.data.map((workbook: any) => {
          //   const worskspace = workbook.workspace
            
          //   const tempWorkspace  = this.workspaces.filter(item => item.id === worskspace)[0];
          //   console.log(tempWorkspace)
          //   workspace.workbooks.push(workbook)
          // })
          console.log(this.workspaces)
          workspace.workbooks = [...res.workbooks]
        }
      )
  }

  addWorkspace() {
    console.log('add')
    const newWorkspace = {
      title: faker.name.firstName(),
      'properties': {
        'icon': this.getRandomIcon(),
        'background': this.getRandomColor()
      },
      'workbooks': [],
      'isActive': true
    }
    this.apiService.postData('workspaces/create', newWorkspace)
      .subscribe(
        res => {
          console.log(res);
          this.getWorkspaces();
        }
      )
  }

  editWorkspace(workspace: any) {
    console.log(workspace)
    const newObj = {...workspace};
    const id = newObj._id;
    delete newObj['_id'];

    newObj.properties.background = this.getRandomColor();
    newObj.properties.icon = this.getRandomIcon();

    const endpoint = `workspaces/update/${id}`;
    console.log(endpoint)
    this.apiService.putData(endpoint, newObj)
      .subscribe(
        res => {
          console.log(res);
          this.getWorkspaceById(id);
        }
      )
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color.toLowerCase();
  }

  getRandomIcon() {
    const randomIndex = this.getRandomArbitrary(0, this.iconArray.length - 1);
    console.log(this.iconArray, randomIndex, this.iconArray[randomIndex])
    return this.iconArray[randomIndex]
  }

  getRandomArbitrary(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}

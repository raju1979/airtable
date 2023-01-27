import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.scss']
})
export class WorkbookComponent {

  workbookId: string | null = '';
  activeWorkbook:any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }
  ngOnInit(): void {
    this.workbookId = this.route.snapshot.paramMap.get('id');
    if (!this.workbookId) {
      this.router.navigate(['../'], { relativeTo: this.route })
    }else{
      this.getWorkbookDetails(this.workbookId)
    }
  }

  getWorkbookDetails(id: string): void {
    this.apiService.getData(`workbooks/get/${id}`)
    .subscribe(
      (res => {
        console.log(res)
        this.activeWorkbook = res;
      })
    )
  }

}

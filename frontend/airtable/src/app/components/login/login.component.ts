import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private apiService: ApiService,
    private route: Router,
    private storage: StorageMap
  ) { }

  login(navigateUrl: string): void {
    this.apiService.postData('user/login', {
      'username': 'admin',
      'rememberMe': false,
      'password': 'aaAA@@123444'
    }).subscribe(
      res => {
        this.storage.set('token', res.data.accessToken).subscribe(() => {
          this.route.navigateByUrl(navigateUrl);
        });       
        
      }
    )
  }

}

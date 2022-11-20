import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private storage: StorageMap, 
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    let url: string = state.url;
    return this.storage.get('token').pipe(
        map(e => {
            console.log('yyyyyyyyyyyyyyy', e)
          if (e) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return of(false);
          }
        }),
        catchError((err) => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }

  checkLogin(url: string): Observable<unknown> {
    /* if (this.loggedInService.isLoggedIn) {
      return true;
    } else {
      this.loggedInService.redirectUrl = url;
      return false;
    } */
    return this.storage.get('token');
  }
}
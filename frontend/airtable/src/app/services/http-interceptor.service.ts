import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

import { environment } from '../../environment/environment';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: any;
  constructor(private storage: StorageMap) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    return this.storage.get('token').pipe(
      tap((token) => (this.token = token)), // side effect to set token property on auth service
      switchMap((token) => {
        // use transformation operator that maps to an Observable<T>
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(newRequest);
      })
    );
  }
}


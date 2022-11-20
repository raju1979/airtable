import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token: any;
    constructor(private storage: StorageMap) { 
        this.storage.get('token')
            .subscribe(
                res => this.token = res
            )
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        
        if (this.token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.token}` }
            });
        }

        return next.handle(request);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }
  

  getData(endpoint: string, options?:string): Observable<any> {
    const optionsInner = options || '?page=1&perPage=20&sort=createdAt%40desc&isActive=true';
    const ENDPOINT = `${this.baseUrl}/${endpoint}${optionsInner}`;
    return this.http.get(ENDPOINT)
  }

  postData(endpoint: string, data?: any) : Observable<any> {
    const ENDPOINT = `${this.baseUrl}/${endpoint}`;
    return this.http.post(ENDPOINT, data);
  }

  putData(endpoint: string, data?: any) : Observable<any> {
    const ENDPOINT = `${this.baseUrl}/${endpoint}`;
    return this.http.put(ENDPOINT, data);
  }
}

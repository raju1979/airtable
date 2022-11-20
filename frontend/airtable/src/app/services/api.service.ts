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
  

  getData(endpoint: string): Observable<any> {
    const ENDPOINT = `${this.baseUrl}/${endpoint}`;
    return this.http.get(ENDPOINT)
  }

  postData(endpoint: string, data: any) : Observable<any> {
    const ENDPOINT = `${this.baseUrl}/${endpoint}`;
    return this.http.post(ENDPOINT, data);
  }
}

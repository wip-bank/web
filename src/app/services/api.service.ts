import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  private formatErrors(error: any) {
    return Observable.throw({
      error: error.text()
    });
  }

  get(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`)
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body))
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body))
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  postFormData(path: string, body: Object = {}): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/X-www-form-urlencoded'
    });
    return this.http.post(`${environment.api_url}${path}`,
      this.buildQueryString(body),
      { headers })
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  putFormData(path: string, body: Object = {}): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/X-www-form-urlencoded'
    });
    return this.http.put(`${environment.api_url}${path}`,
      this.buildQueryString(body),
      { headers })
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  private buildQueryString(object: Object = {}): string {
    const params = new URLSearchParams();
    Object.keys(object).map((key, value) => params.set(key, object[key]));
    return params.toString();
  }

  private mapResponse(res: Response): Object {
    return res.json();
  }
}

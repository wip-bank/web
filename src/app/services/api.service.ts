import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

/**
 * Bietet eine Abstraktionsschicht über dem HTTP Modul von Angular
 * Sollte nur von anderen Services und nicht direkt verwendet werden
 * @author Philipp Dyck
 */
@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  /**
   * Macht aus einem Error ein Observable im richtigen Format
   * @author Philipp Dyck
   */
  private formatErrors(error: any) {
    return Observable.throw({
      error: error.text()
    });
  }

  /**
   * HTTP GET Anfrage versenden
   * @author Philipp Dyck
   */
  get(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`)
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  /**
   * HTTP PUT Anfrage versenden
   * @author Philipp Dyck
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body))
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  /**
   * HTTP POST Anfrage versenden
   * @author Philipp Dyck
   */
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body))
      .catch(this.formatErrors)
      .map(this.mapResponse);
  }

  /**
   * HTTP POST Anfrage als Form Request versenden
   * @author Philipp Dyck
   */
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

  /**
   * HTTP PUT Anfrage als Form Request versenden
   * @author Philipp Dyck
   */
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

  /**
   * Macht aus einem Objekt einen Query String für Form Requests
   * @author Philipp Dyck
   */
  private buildQueryString(object: Object = {}): string {
    const params = new URLSearchParams();
    Object.keys(object).map((key, value) => params.set(key, object[key]));
    return params.toString();
  }

  /**
   * Parset eine Response als JSON wenn möglich
   * Ansonsten einfach einen String zurückgeben
   * @author Philipp Dyck
   */
  private mapResponse(res: Response): Object {
    try {
      return res.json();
    } catch (error) {
      return res;
    }
  }
}

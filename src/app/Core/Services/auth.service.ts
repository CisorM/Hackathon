import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { appSettings } from '../../settings/appsettings';
import { Admin, Login, loginResponse } from '../Interfaces/admin.interface';
import { getCookieHeader } from '../../custom/getCookieHeader';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appSettings.apiUrl;

  constructor() {}

  registrarse(objeto: Admin): Observable<loginResponse> {
    const { headerPost } = getCookieHeader();
    return this.http.post<loginResponse>(
      `${this.baseUrl}admin/create`,
      objeto,
      { headers: headerPost }
    );
  }

  login(objeto: Login): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.baseUrl}admin/login`, objeto);
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}admin/logout`, {});
  }

  validarToken(token: string): Observable<loginResponse> {
    return this.http.get<loginResponse>(
      `${this.baseUrl}Acceso/ValidarToken?token=${token}`
    );
  }
}

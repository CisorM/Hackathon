import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comunidad } from '../Interfaces/comunidad.interface';
import { Observable } from 'rxjs';
import { appSettings } from '../../settings/appsettings';
import { getCookieHeader } from '../../custom/getCookieHeader';

@Injectable({
  providedIn: 'root',
})
export class ComunidadService {
  private apiUrl = `${appSettings.apiUrl}community/create`; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createComunidad(comunidad: Comunidad): Observable<any> {
    const { headerPost } = getCookieHeader();

    return this.http.post(this.apiUrl, comunidad, { headers: headerPost });
  }
}

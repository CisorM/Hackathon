import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appSettings } from '../../settings/appsettings';
import { getCookieHeader } from '../../custom/getCookieHeader';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private apiUrl = `${appSettings.apiUrl}`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const { headers } = getCookieHeader();
    return new HttpHeaders(headers);
  }

  getMostRequiredMedications(): Observable<any> {
    return this.http.get(`${this.apiUrl}medication/getMostRequired`, {
      headers: this.getHeaders(),
    });
  }

  getMostDonatedMedications(): Observable<any> {
    return this.http.get(`${this.apiUrl}medication/getMostDonated`, {
      headers: this.getHeaders(),
    });
  }

  getMedicationsExpired(): Observable<any> {
    return this.http.get(`${this.apiUrl}medication/getExpired`, {
      headers: this.getHeaders(),
    });
  }

  getMedicationsExpiredSoon(): Observable<any> {
    return this.http.get(`${this.apiUrl}medication/getExpireSoon`, {
      headers: this.getHeaders(),
    });
  }

  getMedicationsUrgency(): Observable<any> {
    return this.http.get(`${this.apiUrl}medication/getUrgency`, {
      headers: this.getHeaders(),
    });
  }

  getMedicationsByCommunity(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}medication/getMostRequeriedByCommunity`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getCommunitiesMostDelivered(): Observable<any> {
    return this.http.get(`${this.apiUrl}delivery/getCommunitiesMostDelivered`, {
      headers: this.getHeaders(),
    });
  }

  getDeliveredMedications(): Observable<any> {
    return this.http.get(`${this.apiUrl}delivery/getDeliveredMedications`, {
      headers: this.getHeaders(),
    });
  }

  getMostDeliveredPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}delivery/getMostDeliveredPatients`, {
      headers: this.getHeaders(),
    });
  }
}

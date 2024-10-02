import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { fullDonationData } from '../../../Core/Interfaces/fullDonationCard.interface';

@Component({
  selector: 'app-perfil-entrega',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './perfil-donativo.component.html',
  styleUrls: ['./perfil-donativo.component.css'],
})
export default class PerfilDonativoComponent implements OnInit {
  donativoId: number | null = null;
  donativo: fullDonationData | null = null;
  medicationList: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.donativoId = id ? +id : null;

      if (this.donativoId) {
        this.loadDonationsData(this.donativoId);
      }
    });
  }

  loadDonationsData(id: number): void {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { message: string; Donation: fullDonationData } }>(
        `${appSettings.apiUrl}donation/getById/${id}`,
        { headers }
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.donativo = data.data.Donation;
          console.log('Datos del donativo:', this.donativo);
          this.extractMedications();
        },
        (error) => {
          console.error('Error al obtener los datos del donativo:', error);
        }
      );
  }

  extractMedications(): void {
    if (this.donativo && this.donativo.medications) {
      this.medicationList = this.donativo.medications.map((med) => med.name);
    } else {
      this.medicationList = [];
    }
  }
}

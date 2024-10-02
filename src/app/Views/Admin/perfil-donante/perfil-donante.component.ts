import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { fullCharityData } from '../../../Core/Interfaces/fullCharityCard.interface';

@Component({
  selector: 'app-perfil-paciente',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './perfil-donante.component.html',
  styleUrls: ['./perfil-donante.component.css'],
})
export default class PerfilPacienteComponent implements OnInit {
  charityId: number | null = null;
  charity: fullCharityData | null = null;
  id_card: string = '';
  fundacion: string = 'No es fundación';
  donationsList: {
    name: string;
    donation: { quantity: number; expirationDate: Date };
  }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.charityId = id ? +id : null;

      if (this.charityId) {
        this.loadPatientData(this.charityId);
      }
    });
  }

  loadPatientData(id: number): void {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { message: string; Charity: fullCharityData } }>(
        `${appSettings.apiUrl}charity/getFullCharity/${id}`,
        { headers }
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.charity = data.data.Charity;
          this.id_card = `${data.data.Charity.indentification_type}-${data.data.Charity.identification}`;
          this.fundacion = this.charity.is_fundation
            ? 'Es fundación'
            : 'No es fundación';
          console.log('Datos del donante:', this.charity);
          this.extractDonations();
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
  }

  extractDonations(): void {
    if (this.charity && this.charity.donations) {
      this.donationsList = this.charity.donations
        .map((don) => {
          return don.medications.map((med) => {
            return {
              name: med.name,
              donation: {
                quantity: med.medication_donation.quantity,
                expirationDate: med.medication_donation.expiration_date,
              },
            };
          });
        })
        .flat();
    } else {
      this.donationsList = [];
    }
  }
}

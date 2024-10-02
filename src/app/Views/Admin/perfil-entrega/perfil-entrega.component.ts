import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { BtnComponent } from '../../../Shared/btn/btn.component';
import { fullDeliveryData } from '../../../Core/Interfaces/fullDeliveryCard.interface copy';

@Component({
  selector: 'app-perfil-entrega',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './perfil-entrega.component.html',
  styleUrls: ['./perfil-entrega.component.css'],
})
export default class PerfilEntregaComponent implements OnInit {
  deliveryId: number | null = null;
  delivery: fullDeliveryData | null = null;
  medicationList: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.deliveryId = id ? +id : null;

      if (this.deliveryId) {
        this.loadDeliveryData(this.deliveryId);
      }
    });
  }

  loadDeliveryData(id: number): void {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { message: string; delivery: fullDeliveryData } }>(
        `${appSettings.apiUrl}delivery/getMedicationByDelivery/${id}`,
        { headers }
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.delivery = data.data.delivery;
          console.log('Datos del delivery:', this.delivery);
          this.extractMedications();
        },
        (error) => {
          console.error('Error al obtener los datos del delivery:', error);
        }
      );
  }

  extractMedications(): void {
    if (this.delivery && this.delivery.deliveryDetails.medications) {
      this.medicationList = this.delivery.deliveryDetails.medications.map(
        (deli) => deli.medication_name
      );
    } else {
      this.medicationList = [];
    }
  }
}

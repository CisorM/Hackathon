import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fullPatientData } from '../../../Core/Interfaces/fullPatientCard.interface';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { BtnComponent } from '../../../Shared/btn/btn.component';

@Component({
  selector: 'app-perfil-paciente',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css'],
})
export default class PerfilPacienteComponent implements OnInit {
  patientId: number | null = null;
  patient: fullPatientData | null = null;
  pathologiesList: string[] = [];

  patientData: fullPatientData = {
    id: 51,
    id_card: 30030619,
    first_name: 'Jennica',
    last_name: 'Poytress',
    birth_date: '2024-03-31T18:39:59.000Z',
    email: 'jennica.poytress@yahoo.com',
    phone: '(407) 809-9425',
    address: '8849 Vibrant Lane, Orlando, Florida, United States, 32835',
    gender: 'other',
    status: 'active',
    createdAt: '2024-08-14T06:16:05.000Z',
    pathologies: [
      {
        name: 'Parkinson’s Disease',
      },
      {
        name: 'Parkinson’s Disease',
      },
    ],
    treatments: [
      {
        id: 25,
        observation: 'Tomar con precaución',
        status: 'parcialmente abastecido',
        active: 'active',
        createdAt: '2024-06-08T00:42:18.000Z',
        medications: [
          {
            id: 8,
            name: 'Paracetamol',
            medication_quantity: {
              quantity: 12,
            },
          },
          {
            id: 10,
            name: 'Ibuprofen',
            medication_quantity: {
              quantity: 7,
            },
          },
        ],
      },
    ],
    deliveries: [
      {
        id: 1,
        appointment_date: '2024-08-06T00:00:00.000Z',
        withdrawal_date: '2024-08-06T00:00:00.000Z',
        treatment_id: 25,
        patient_id: 51,
        expiration_date: '2024-08-06T00:00:00.000Z',
        status: 'pendiente',
        createdAt: '2024-09-28T00:00:00.000Z',
        updatedAt: '2024-09-28T00:00:00.000Z',
        medications: [
          {
            name: 'Ibuprofen',
            delivery_details: {
              quantity: 10,
            },
          },
          {
            name: 'Atorvastatin',
            delivery_details: {
              quantity: 7,
            },
          },
          {
            name: 'Aspirin',
            delivery_details: {
              quantity: 5,
            },
          },
        ],
        returns: [
          {
            id: 1,
            reason: 'Vencido',
            date: '2024-09-28T00:00:00.000Z',
            delivery_id: 1,
            createdAt: '2024-09-28T00:00:00.000Z',
            updatedAt: '2024-09-28T00:00:00.000Z',
            medications: [
              {
                id: 4,
                name: 'Simvastatin',
                return_details: {
                  quantity: 7,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.patientId = id ? +id : null;

      if (this.patientId) {
        this.loadPatientData(this.patientId);
      }
    });
  }

  loadPatientData(id: number): void {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { message: string; Patient: fullPatientData } }>(
        `${appSettings.apiUrl}patient/getFullPatient/${id}`,
        { headers }
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.patient = data.data.Patient;
          console.log('Datos del paciente:', this.patient);
          this.extractPathologies();
        },
        (error) => {
          console.error('Error al obtener los datos del paciente:', error);
        }
      );
  }

  extractPathologies(): void {
    if (this.patient && this.patient.pathologies) {
      this.pathologiesList = this.patient.pathologies.map((path) => path.name);
    } else {
      this.pathologiesList = [];
    }
  }
}

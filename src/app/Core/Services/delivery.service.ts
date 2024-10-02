import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DeliveryInterface, MedicationInterface } from '../Interfaces/delivery.interface'; // Asegúrate de que la ruta sea correcta
import { TreatmentInterface } from '../Interfaces/treatment.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { z, ZodError } from 'zod';
import { appSettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {

  private medicationSchema = z.object({
    id: z.number().int().optional(),
    name: z.string().min(1, {
      message: "El nombre del medicamento es obligatorio."
    }),
    delivery_details: z.object({
      quantity: z.number().int().nonnegative().refine(qty => qty > 0, {
        message: "La cantidad debe ser un número positivo."
      }),
    })
  });


  private deliverySchema = z.object({
    patient_id: z.number().int().positive().or(z.literal(0)).refine(id => id !== 0, {
      message: "El paciente es obligatorio"
    }),
    treatment_id: z.number().int().positive().or(z.literal(0)).refine(id => id !== 0, {
      message: "El tratamiento es obligatorio "
    }),
    appointment_date: z.string().min(1, {
      message: "La fecha de la cita es obligatoria."
    }),
    expiration_date: z.string().min(1, {
      message: "La fecha de vencimiento es obligatoria."
    }),
    medications: z.array(this.medicationSchema).nonempty({
      message: "Debe haber al menos un medicamento."
    })
  });

  private delivery: BehaviorSubject<DeliveryInterface> = new BehaviorSubject<DeliveryInterface>({
    patient_id: 0,
    patientidCard: 0,
    treatment_id: 0,
    appointment_date: "",
    withdrawal_date: null,
    expiration_date: "",
    medications: []
  });

  private apiURL = `${appSettings.apiUrl}delivery/`;

  constructor(private http: HttpClient) {}

  public getDelivery(): Observable<DeliveryInterface> {
    return this.delivery.asObservable();
  }

  public setDelivery(newDelivery: DeliveryInterface): void {
    this.delivery.next(newDelivery);
  }

  public updateDelivery(updatedDelivery: Partial<DeliveryInterface>): void {
    const currentDelivery = this.delivery.getValue();
    this.delivery.next({ ...currentDelivery, ...updatedDelivery });
  }

  public updatePatient(
    idPatient: number,
    patientcardId: number,
    patientName: string
  ): void {
    const currentDelivery = this.delivery.getValue();
    this.delivery.next({
      ...currentDelivery,
      patient_id: idPatient,
      patientidCard: patientcardId,
      patient_name: patientName,
    });
  }

  public addMedicationsFromTreatment(treatment: TreatmentInterface): void {
    console.log(treatment);
    const newMedications: MedicationInterface[] = treatment.medications
      ? treatment.medications.map((med) => ({
          id: med.id,
          name: med.name,
          delivery_details: {
            quantity: 0,
            max_quantity: med.quantity,
          },
        }))
      : [];

    const updatedMedications = [...newMedications];
    this.updateDelivery({ medications: updatedMedications });
  }

  public removeMedication(medicationId: number): void {
    const currentDelivery = this.delivery.getValue();
    const updatedMedications = currentDelivery.medications.filter(
      (med) => med.delivery_details.quantity !== medicationId
    );
    this.updateDelivery({ medications: updatedMedications });
  }

  public increaseMedicationQuantity(
    medicationId: number,
    amount: number = 1
  ): void {
    const currentDelivery = this.delivery.getValue();
    const updatedMedications = currentDelivery.medications.map((med) => {
      if (med.id === medicationId) {
        return {
          ...med,
          delivery_details: {
            quantity: med.delivery_details.quantity + amount,
            max_quantity: med.delivery_details.max_quantity,
          },
        };
      }
      return med;
    });
    this.updateDelivery({ medications: updatedMedications });
    console.log(this.delivery.getValue());
  }

  public decreaseMedicationQuantity(
    medicationId: number,
    amount: number = 1
  ): void {
    const currentDelivery = this.delivery.getValue();
    const updatedMedications = currentDelivery.medications.map((med) => {
      if (med.id === medicationId) {
        const newQuantity = med.delivery_details.quantity - amount;
        return {
          ...med,
          delivery_details: {
            quantity: newQuantity > 0 ? newQuantity : 0,
            max_quantity: med.delivery_details.max_quantity,
          },
        };
      }
      return med;
    });
    this.updateDelivery({ medications: updatedMedications });
  }

  public updateExpirationDate(expirationDate: string): void {
    const currentDelivery = this.delivery.getValue();
    this.delivery.next({ ...currentDelivery, expiration_date: expirationDate });
  }
  public onApoinmentDateChange(expirationDate: string): void {
    const currentDelivery = this.delivery.getValue();
    this.delivery.next({ ...currentDelivery, appointment_date: expirationDate });
  }
  public onWithdrawalDateChange(expirationDate: string): void {
    const currentDelivery = this.delivery.getValue();
    this.delivery.next({ ...currentDelivery, withdrawal_date: expirationDate });
  }


  public validateDelivery(delivery: any): { success: boolean; messages?: string[] } {
    try {
      this.deliverySchema.parse(delivery); // Validar usando el esquema
      return { success: true };
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Error de validación:', error.errors);
        const errorMessages = error.errors.map(err => err.message);
        return { success: false, messages: errorMessages }; // Retorna los mensajes de error
      } else {
        console.error('Error inesperado:', error);
        return { success: false, messages: ['Ocurrió un error inesperado'] };
      }
    }
  }


  public saveDelivery(): Observable<any> {
    const delivery = this.delivery.getValue();

    const validationResult = this.validateDelivery(delivery);
    if (!validationResult.success) {
      return of({ success: false, messages: validationResult.messages });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      patient_id: delivery.patient_id,
      treatment_id: delivery.treatment_id,
      appointment_date: delivery.appointment_date,
      withdrawal_date: null,
      expiration_date: delivery.expiration_date,
      medications: delivery.medications.map(med => ({
        medication_id: med.id,
        quantity: med.delivery_details.quantity
      }))
    };

    return this.http.post(`${this.apiURL}create`, data, { headers });
  }
}

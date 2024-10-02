import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TreatmentInterface } from '../Interfaces/treatment.interface';
import { MedicationInterface } from '../Interfaces/medication.interface';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../../settings/appsettings';
import { getCookieHeader } from '../../custom/getCookieHeader';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {


  private medicationSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, { message: "El nombre del medicamento es obligatorio." }),
    quantity: z.number().int().nonnegative().refine(qty => qty > 0, {
      message: "La cantidad debe ser un número positivo."
    })
  });

  // Esquema de validación para el tratamiento
  private treatmentSchema = z.object({
    id: z.number().optional(),
    patient_id: z.number().int().positive(),
    patientName: z.string().optional(),
    observation: z.string().min(1, { message: "La observación es obligatoria." }),
    status: z.enum(["not supplied", "partially supplied", "supplied"]).optional(),
    active: z.enum(["active", "inactive", "deleted"]).optional(),
    medications: z.array(this.medicationSchema).nonempty({ message: "Debe haber al menos un medicamento." }).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
  });


  private apiURL = `${appSettings.apiUrl}treatment`;

  public treatment: BehaviorSubject<TreatmentInterface> =
    new BehaviorSubject<TreatmentInterface>({
      patient_id: 0,
      patientName: '',
      observation: '',
      medications: [],
    });

  private data: Observable<any> = this.treatment.asObservable();

  constructor(private http: HttpClient) {}

  public updateTreatment(newTreatment: any): void {
    this.treatment.next(newTreatment);
  }

  public updatePatient(id: number, name: string): void {
    const newTreatment = {
      ...this.treatment.getValue(),
      patient_id: id,
      patientName: name,
    };

    this.updateTreatment(newTreatment);
  }

  public updateObservation(observation: string): void {
    const currentTreatment = this.treatment.getValue();
    const newTreatment = {
      ...currentTreatment,
      observation: observation,
    };

    this.updateTreatment(newTreatment);
  }

  public addMedication(id: number, name: string, quantity: number): void {
    const currentTreatment = this.treatment.getValue();

    const existingMedicationIndex = currentTreatment.medications!.findIndex(
      (med: MedicationInterface) => med.id === id
    );

    let newMedications;

    if (existingMedicationIndex !== -1) {
      const existingMedication =
        currentTreatment.medications![existingMedicationIndex];
      existingMedication.quantity += quantity;

      newMedications = [
        ...currentTreatment.medications!.slice(0, existingMedicationIndex),
        existingMedication,
        ...currentTreatment.medications!.slice(existingMedicationIndex + 1),
      ];
    } else {
      newMedications = [
        ...currentTreatment.medications!,
        { id, name, quantity },
      ];
    }

    const newTreatment = {
      ...currentTreatment,
      medications: newMedications,
    };

    this.updateTreatment(newTreatment);
  }

  public removeMedication(medicineId: string): void {
    const currentTreatment = this.treatment.getValue();
    const newMedications = currentTreatment.medications!.filter(
      (med: any) => med.id !== medicineId
    );

    const newTreatment = {
      ...currentTreatment,
      medications: newMedications,
    };

    this.updateTreatment(newTreatment);
  }

  public increaseMedicationQuantity(medicineId: string): void {
    const currentTreatment = this.treatment.getValue();
    const newMedications = currentTreatment.medications!.map(
      (medication: any) => {
        if (medication.id === medicineId) {
          return { ...medication, quantity: medication.quantity + 1 };
        }
        return medication;
      }
    );

    const newTreatment = {
      ...currentTreatment,
      medications: newMedications,
    };

    this.updateTreatment(newTreatment);
  }

  public decreaseMedicationQuantity(medicineId: string): void {
    const currentTreatment = this.treatment.getValue();

    const newMedications = currentTreatment.medications!.map(
      (medication: any) => {
        if (medication.id === medicineId) {
          return {
            ...medication,
            quantity: Math.max(medication.quantity - 1, 0),
          };
        }
        return medication;
      }
    );

    const newTreatment = {
      ...currentTreatment,
      medications: newMedications,
    };
    this.updateTreatment(newTreatment);
  }

  public getTreatment(): Observable<any> {
    return this.data;
  }

  public validateTreatment(treatment: any): { success: boolean; messages?: string[] } {
    try {
      this.treatmentSchema.parse(treatment); // Validar usando el esquema
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Error de validación:', error.errors);
        const errorMessages = error.errors.map(err => err.message);
        return { success: false, messages: errorMessages }; // Retorna los mensajes de error
      } else {
        console.error('Error inesperado:', error);
        return { success: false, messages: ['Ocurrió un error inesperado'] };
      }
    }
  }

  public saveTreatment(): Observable<any> {
    const treatment = this.treatment.getValue();


    const validationResult = this.validateTreatment(treatment);
    if (!validationResult.success) {
      return of({ success: false, messages: validationResult.messages }); // Retorna errores de validación
    }

    const { headerPost } = getCookieHeader();

    const data = {
      patient_id: treatment.patient_id,
      observation: treatment.observation,
      medications: treatment.medications!.map(med => ({
        medication_id: med.id,
        quantity: med.quantity,
      })),
    };

    console.log(data);
    return this.http.post(`${this.apiURL}/create`, data, {
      headers: headerPost,
    });
  }
}

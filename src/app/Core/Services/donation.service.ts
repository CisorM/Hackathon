import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostDonationInterface } from '../Interfaces/donation.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { z, ZodError } from 'zod';
import { appSettings } from '../../settings/appsettings';
import { getCookieHeader } from '../../custom/getCookieHeader';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private apiURL = `${appSettings.apiUrl}donation/`;


  private dateSchema = z.string().refine(date => {
    if (!date) {
        return false;
    }
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate >= today;
}, {
    message: "La fecha es obligatoria y no puede ser anterior a la fecha actual."
});

  private medicationSchema = z.object({
    medication_id: z.number().int().positive().or(z.literal(0)).refine(id => id !== 0, {
      message: "El ID del medicamento es requerido y debe ser un número positivo."
    }),
    quantity: z.number().int().nonnegative().refine(qty => qty > 0, {
      message: "La cantidad debe ser un número positivo."
    }),
    expiration_date: this.dateSchema,
  });

  private donationSchema = z.object({
    description: z.string().min(1, { message: "La descripción es requerida." }),
    category_id: z.number().int().positive().or(z.literal(0)).refine(id => id !== 0, {
      message: "La Categoria es Obligatoria"
    }),
    charity_id: z.number().int().positive().or(z.literal(0)).refine(id => id !== 0, {
      message: "Debe seleccionar un Donador"
    }),
    medications: z.array(this.medicationSchema).nonempty({ message: "Se requiere al menos un medicamento." }),
  });


  public donation: BehaviorSubject<PostDonationInterface> =
    new BehaviorSubject<PostDonationInterface>({
      description: '',
      category_id: 0,
      category_name: '',
      razon_social: '',
      charity_id: 0,
      charity_name: '',
      medications: [],
    });

  private data: Observable<PostDonationInterface> =
    this.donation.asObservable();

  constructor(private http: HttpClient) {}

  public updateDonation(newDonation: PostDonationInterface): void {
    this.donation.next(newDonation);
  }

  public updateCharity(id: number, name: string, razon_social: string): void {
    const currentDonation = this.donation.getValue();

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      charity_id: id,
      charity_name: name,
      razon_social : razon_social
    };

    this.updateDonation(newDonation);
  }

  public removeCharity(){
    const currentDonation = this.donation.getValue();

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      charity_id: 0,
      charity_name: '',
    };

    this.updateDonation(newDonation);
  }

  public updateDescription(description: string): void {
    const currentDonation = this.donation.getValue();
    const newDonation = {
      ...currentDonation,
      description: description,
    };

    this.updateDonation(newDonation);
  }

  public addMedication(id: number, name: string, quantity: number): void {
    const currentDonation = this.donation.getValue();

    const existingMedicationIndex = currentDonation.medications?.findIndex(
      (med) => med.medication_id === id
    );

    let newMedications;

    if (existingMedicationIndex !== -1) {
      const existingMedication =
        currentDonation.medications![existingMedicationIndex!];
      existingMedication.quantity += quantity;

      newMedications = [
        ...currentDonation.medications!.slice(0, existingMedicationIndex),
        existingMedication,
        ...currentDonation.medications!.slice(existingMedicationIndex! + 1),
      ];
    } else {
      newMedications = [
        ...currentDonation.medications!,
        { medication_id: id, name: name, quantity },
      ];
    }

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      medications: newMedications,
    };

    this.updateDonation(newDonation);
  }

  public removeMedication(medicineId: number): void {
    const currentDonation = this.donation.getValue();
    const newMedications = currentDonation.medications!.filter(
      (med) => med.medication_id !== medicineId
    );

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      medications: newMedications,
    };

    this.updateDonation(newDonation);
  }

  public increaseMedicationQuantity(medicineId: number): void {
    const currentDonation = this.donation.getValue();
    const newMedications = currentDonation.medications!.map((medication) => {
      if (medication.medication_id === medicineId) {
        return { ...medication, quantity: medication.quantity + 1 };
      }
      return medication;
    });

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      medications: newMedications,
    };

    this.updateDonation(newDonation);
  }

  public decreaseMedicationQuantity(medicineId: number): void {
    const currentDonation = this.donation.getValue();

    const newMedications = currentDonation.medications!.map((medication) => {
      if (medication.medication_id === medicineId) {
        return {
          ...medication,
          quantity: Math.max(medication.quantity - 1, 0),
        };
      }
      return medication;
    });

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      medications: newMedications,
    };

    this.updateDonation(newDonation);
  }

  public updateMedicationExpireDate(
    medicineId: number,
    newExpireDate: string
  ): void {
    const currentDonation = this.donation.getValue();

    const newMedications = currentDonation.medications!.map((medication) => {
      if (+medication.medication_id === medicineId) {
        return { ...medication, expiration_date: newExpireDate };
      }
      return medication;
    });

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      medications: newMedications,
    };

    this.updateDonation(newDonation);
    console.log(this.donation.getValue());
  }

  public updateCategory(categoryId: number): void {
    const currentDonation = this.donation.getValue();

    const newDonation: PostDonationInterface = {
      ...currentDonation,
      category_id: categoryId,
    };
    console.log(this.donation.getValue());
    this.updateDonation(newDonation);
  }

  public getDonation(): Observable<PostDonationInterface> {
    return this.data;
  }

  public validateDonation(donation: any): { success: boolean; messages?: string[] } {
    try {
      this.donationSchema.parse(donation);
      return { success: true };
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Error de validación:', error.errors);
        const errorMessages = error.errors.map(err => err.message);
        return { success: false, messages: errorMessages };
      } else {
        console.error('Error inesperado:', error);
        return { success: false, messages: ['Ocurrió un error inesperado'] };
      }
    }
  }

  public saveDonation(): Observable<any> {
    const donation = this.donation.getValue();


    const validationResult = this.validateDonation(donation);
    if (!validationResult.success) {
      return of({ success: false, messages: validationResult.messages });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const { headerPost } = getCookieHeader();

    const data = {
      description: donation.description,
      category_id: donation.category_id,
      charity_id: donation.charity_id,
      medications: donation.medications.map(med => ({
        medication_id: med.medication_id,
        quantity: med.quantity,
        expiration_date: med.expiration_date
      }))
    };


    return this.http.post(`${this.apiURL}create`, data, { headers });
  }

}

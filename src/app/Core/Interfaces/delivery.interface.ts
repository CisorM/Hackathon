export interface DeliveryInterface {
  id?: number;
  appointment_date: string;
  withdrawal_date: string | null;
  treatment_id: number;
  patient_id: number;
  patientidCard: number
  patient_name?: string;
  expiration_date: string;
  status?: 'pendiente' | 'completado' | 'cancelado';
  createdAt?: string;
  medications: MedicationInterface[];
}

export interface MedicationInterface {
  id? : number
  name: string;
  delivery_details: {
    quantity: number;
    max_quantity?: number
  };
}

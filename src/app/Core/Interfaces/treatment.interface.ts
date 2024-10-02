
export interface TreatmentInterface {
  id?: number;
  patient_id: number;
  patientName? : string
  observation: string;
  status?: "not supplied" | "partially supplied" | "supplied";
  active?: "active" | "inactive" | "deleted";
  medications?:
    {
        id:number;
        name: string
        quantity:number
    }[]

  createdAt?: Date;
  updatedAt?: Date;
}

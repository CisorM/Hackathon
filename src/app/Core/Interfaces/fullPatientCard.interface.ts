export interface fullPatientData {
  id: number;
  id_card: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  status: string;
  createdAt: string;
  pathologies: {
    name: string;
  }[];
  treatments: {
    id: number;
    observation: string;
    status: string;
    active: string;
    createdAt: string;
    medications: {
      id: number;
      name: string;
      medication_quantity: {
        quantity: number;
      };
    }[];
  }[];
  deliveries: {
    id: number;
    appointment_date: string;
    withdrawal_date: string;
    treatment_id: number;
    patient_id: number;
    expiration_date: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    medications: {
      name: string;
      delivery_details: {
        quantity: number;
      };
    }[];
    returns: {
      id: number;
      reason: string;
      date: string;
      delivery_id: number;
      createdAt: string;
      updatedAt: string;
      medications: {
        id: number;
        name: string;
        return_details: {
          quantity: number;
        };
      }[];
    }[];
  }[];
}

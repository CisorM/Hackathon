export interface fullDeliveryData {
  patientData: {
    id: number;
    id_card: number;
    email: string;
    gender: string;
    economic_status: string;
    vulnerability_level: string;
    phone: string;
    address: string;
  };
  deliveryDetails: {
    appointment_date: Date;
    expiration_date: Date;
    withdrawal_date: Date;
    status: string;
    medications: {
      medication_name: string;
      quantity: number;
    }[];
  };
}

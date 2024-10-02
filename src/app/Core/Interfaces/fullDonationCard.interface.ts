export interface fullDonationData {
  id: number;
  description: string;
  createdAt: Date;
  category: {
    name: string;
    description: string;
  };
  charity: {
    razon_social: string;
  };
  medications: {
    name: string;
    medication_details: {
      quantity: number;
      expiration_date: Date;
    };
  }[];
}

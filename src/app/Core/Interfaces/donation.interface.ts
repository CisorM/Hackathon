//para obtener la data

export interface GetDonationInterface {
  id: number;
  description: string;
  createdAt: string;
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
      expiration_date: string;
    };
  }[];
}

//para mandar la data
export interface PostDonationInterface {
  description: string;
  category_id?: number;
  category_name: string;
  charity_id: number;
  razon_social? : string;
  charity_name?: string;
  medications: {
    medication_id: number;
    name?: string;
    quantity: number;
    expiration_date?: string;
  }[];
}

export interface fullCharityData {
  id: number;
  razon_social: string;
  identification: string;
  indentification_type: string;
  is_fundation: boolean;
  donations: {
    id: number;
    description: string;
    medications: {
      id: number;
      name: string;
      medication_donation: {
        quantity: number;
        expiration_date: Date;
      };
    }[];
  }[];
}

export interface PatientInterface {
  id?: number;
  community: {
    name : string
  };
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
  id_card: number;
  phone: string;
  address: string;
  gender: string;
  status: "active" | "inactive" | "deleted";
  pathologies?:
      {
          name:string;
          pathology_patient: {
            description : string
          }
      }[]

  createdAt?: Date;
  updatedAt?: Date;
}

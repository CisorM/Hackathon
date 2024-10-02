export interface CharityInterface {
  id?: number;
  razon_social: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  identification: string;
  indentification_type: "J" | "V" | "E" | "G" | "P" | "M";
  is_fundation: boolean;
}

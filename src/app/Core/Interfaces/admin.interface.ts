export interface Admin {
  id?: number;
  first_name: string;
  last_name: string;
  id_card_prefix: string;
  id_card: string;
  email: string;
  password: string;
  confirm_password: string;
  status?: 'active' | 'inactive' | 'deleted';
  userType: 'admin' | 'donor';
  razon_social?: string;
  description?: string;
  is_fundation?: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface loginResponse {
  message: string;
  data: {
    Admin: Admin;
    token: string;
  };
}

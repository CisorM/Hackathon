export interface Medication {
  medication_name: string;
  total_medicamentos_necesitados: number;
}

export interface CommunityMedications {
  community_name: string;
  medications: Medication[];
}

export interface MedicationResponse {
  data: {
    Medication: CommunityMedications[];
  };
}

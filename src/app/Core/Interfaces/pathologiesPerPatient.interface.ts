export interface PathologiesPerPatient {
  message: string;
  data: {
    patientCountByPathology: {
      pathology_id: number;
      pathology_name: string;
      patient_count: string;
    }[];
  };
}

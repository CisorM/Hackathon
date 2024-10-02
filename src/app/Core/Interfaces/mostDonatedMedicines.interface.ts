export interface mostDonatedInterface {
  message: string,
  data : {
    Medication: {
      medication_id : number,
      medication_name : string,
      donation_count : string,
      total_donated : string
    }[]
  }
}

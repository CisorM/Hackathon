import { Component } from '@angular/core';
import { ListaMedicinasComponent } from "../../../Components/Medicinas/lista-medicinas/lista-medicinas.component";
import { ListaDonanteComponent } from "../../../Components/Donante/lista-donante/lista-donante.component";
import { ResumenDonacionComponent } from "../../../Components/Donacion/resumen-donacion/resumen-donacion.component";
import { CharityInterface } from '../../../Core/Interfaces/charity.interface';
import { MedicationInterface } from '../../../Core/Interfaces/medication.interface';
import { DonationService } from '../../../Core/Services/donation.service';
import { PostDonationInterface } from '../../../Core/Interfaces/donation.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-donacion',
  standalone: true,
  imports: [ListaMedicinasComponent, ListaDonanteComponent, ResumenDonacionComponent, CommonModule],
  templateUrl: './form-donacion.component.html',
  styleUrls: ['./form-donacion.component.css']
})
export default class FormDonacionComponent {
  donation: PostDonationInterface | null = null;

  constructor(private donationService: DonationService) {

  }

  ngOnInit() {
    this.donationService.getDonation().subscribe(donation => {
      this.donation = donation;
    });
  }

  onDonanteSeleccionado(charity: CharityInterface) {
    this.donationService.updateCharity(charity.id!, charity.description, charity.razon_social);
  }

  onDeleteDonante(){
    this.donationService.removeCharity()
  }

  onMedicinaSeleccionada(medicina: MedicationInterface) {
    this.donationService.addMedication(medicina.id!, medicina.name!, 1);
  }
}

import { Component } from '@angular/core';
import { DonationService } from '../../../Core/Services/donation.service';
import { ResumenTratamientoComponent } from '../../Tratamientos/resumen-tratamiento/resumen-tratamiento.component';
import { ResumenMedicinaComponent } from '../../Medicinas/resumen-medicina/resumen-medicina.component';
import { ResumenPacienteComponent } from '../../Paciente/resumen-paciente/resumen-paciente.component';
import { CommonModule } from '@angular/common';
import { ResumenDonanteComponent } from '../../Donante/resumen-donante/resumen-donante.component';
import { PostDonationInterface } from '../../../Core/Interfaces/donation.interface';
import { Subscription } from 'rxjs';
import { CardMedicamentoWithDateComponent } from '../../Medicinas/card-medicamento-with-date/card-medicamento-with-date.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryInterface } from '../../../Core/Interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-resumen-donacion',
  standalone: true,
  imports: [
    ResumenTratamientoComponent,
    ResumenMedicinaComponent,
    ResumenPacienteComponent,
    CommonModule,
    ResumenDonanteComponent,
    CardMedicamentoWithDateComponent,
  ],
  templateUrl: './resumen-donacion.component.html',
  styleUrls: ['./resumen-donacion.component.css'],
})
export class ResumenDonacionComponent {
  donation: PostDonationInterface | null = null;
  private donationSubscription: Subscription | null = null;
  categories: CategoryInterface[] = [];

  constructor(
    private donationService: DonationService,
    private notificationService: ToastrService,
    private http: HttpClient,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit() {
    this.donationSubscription = this.donationService
      .getDonation()
      .subscribe((data) => {
        this.donation = data;
      });
    this.loadCategories();
  }

  loadCategories() {
    const { headers } = getCookieHeader();
    this.http
      .get<{ data: { Category: CategoryInterface[] } }>(
        `${appSettings.apiUrl}category/getAllActive`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.categories = response.data.Category;
        },
        (error) => {
          console.error('Error al cargar las categorías:', error);
        }
      );
  }

  ngOnDestroy() {
    if (this.donationSubscription) {
      this.donationSubscription.unsubscribe();
    }
  }

  onMedicineDeleted(medicineId: number) {
    this.notificationService.warning('Eliminado', 'Alerta');
    this.donationService.removeMedication(medicineId);
  }

  onQuantityIncreased(medicineId: number) {
    this.donationService.increaseMedicationQuantity(medicineId);
  }

  onQuantityDecreased(medicineId: number) {
    this.donationService.decreaseMedicationQuantity(medicineId);
  }

  onDateChanged(medicineId: number, newDate: string) {
    this.donationService.updateMedicationExpireDate(medicineId, newDate);
  }

  onCategorySelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategoryId = selectElement.value;
    this.donationService.updateCategory(+selectedCategoryId);
  }

  onDesacriptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.donationService.updateDescription(target.value);
    }
  }

  deleteCharity() {
    const id = 0;
    const name = '';
    const razon_social = '';
    this.donationService.updateCharity(id, name, razon_social);
  }

  saveDonation(): void {
    this.donationService.saveDonation().subscribe(
      response => {
        if (response.success === false) {
          this.notificationService.error("La Donación tiene errores", "Alerta");
          response.messages?.forEach((message: any) => {
            this.notificationService.error(message, "Alerta");
          });
        } else {
          console.log('Donación guardada correctamente:', response);
          this.notificationService.success("La Donación se guardó correctamente", "Éxito");
          this.router.navigate(['/dashboardMedicinas']);
        }
      },
      error => {
        console.log('Error recibido:', error);
        this.notificationService.error("Ocurrió un error inesperado", "Alerta");
      }
    );
  }
}

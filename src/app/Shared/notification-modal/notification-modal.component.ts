import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { getUserInfoFromToken } from '../../custom/getJwtInfo';
import { appSettings } from '../../settings/appsettings';
import { getCookieHeader } from '../../custom/getCookieHeader';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
})
export class NotificationModalComponent {
  public visible: boolean = false;
  public menuVisible: boolean = false;
  public notifications: string[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.getExpireSoonMedicines();
  }
  ngOnInit() {
    const { userType } = getUserInfoFromToken();
    userType === 'donor'
      ? (this.menuVisible = false)
      : (this.menuVisible = true);
  }

  public showModal() {
    this.visible = true;
    this.getExpireSoonMedicines();
  }

  public closeModal() {
    this.visible = false;
  }

  private getExpireSoonMedicines() {
    const { headers } = getCookieHeader();
    this.http
      .get<any>(`${appSettings.apiUrl}medication/getExpireSoon`, { headers })
      .subscribe({
        next: (response) => {
          const medications = response.data.Medication;
          const today = new Date();
          const thirtyDaysFromNow = new Date(today);
          thirtyDaysFromNow.setDate(today.getDate() + 30);

          this.notifications = medications
            .map((med: any) => {
              const expirationDate = new Date(med.expiration_date);
              const timeDiff = expirationDate.getTime() - today.getTime();
              const daysUntilExpiration = Math.ceil(
                timeDiff / (1000 * 3600 * 24)
              );

              return daysUntilExpiration >= 0 && daysUntilExpiration <= 30
                ? `Tienes un lote de ${med.quantity} ${med.medication_name} que vencen en ${daysUntilExpiration} días.`
                : null;
            })
            .filter((notification: any) => notification !== null);

          if (this.notifications.length === 0) {
            this.toastr.info(
              'No hay medicamentos que expiren pronto',
              'Información'
            );
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error al obtener las notificaciones', 'Error');
        },
      });
  }
}

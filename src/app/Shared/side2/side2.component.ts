import { Component, inject, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { AccesoService } from '../../Core/Services/auth.service';
import { deleteCookie } from '../../Authentication/login/cookies';
import { getUserInfoFromToken } from '../../custom/getJwtInfo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side2',
  standalone: true,
  imports: [SidebarModule, ButtonModule, PanelMenuModule, CommonModule],
  templateUrl: './side2.component.html',
  styleUrl: './side2.component.css',
})
export class Side2Component implements OnInit {
  sidebarVisible: boolean = false;
  menuVisible: boolean = false;
  name: string = 'Usuario';
  items: MenuItem[] | undefined;
  logoutItem: MenuItem | undefined;
  private accesoService = inject(AccesoService);

  constructor(private router: Router) {}
  ngOnInit() {
    const { name, userType } = getUserInfoFromToken();
    userType === 'donor'
      ? (this.menuVisible = false)
      : (this.menuVisible = true);
    this.name = name;

    this.items = [
      {
        label: 'Gestión',
        icon: 'pi pi-arrow-right-arrow-left',
        items: [
          {
            label: 'Paciente',
            icon: 'pi pi-user',
            items: [
              {
                label: 'General',
                icon: 'pi pi-desktop',
                command: () => this.navigateToRoute('/gestionPaciente'),
              },
              {
                label: 'Tratamiento',
                icon: 'pi pi-face-smile',
                command: () => this.navigateToRoute('/crearTratamiento'),
              },
              {
                label: 'Vulnerable',
                icon: 'pi pi-exclamation-triangle',
                command: () =>
                  this.navigateToRoute('/gestionPacienteVulnerable'),
              },
            ],
          },
          {
            label: 'Donante',
            icon: 'pi pi-warehouse',
            items: [
              {
                label: 'General',
                icon: 'pi pi-desktop',
                command: () => this.navigateToRoute('/gestionDonante'),
              },
              {
                label: 'Categorias',
                icon: 'pi pi-tags',
                command: () => this.navigateToRoute('/gestionCategoria'),
              },
              {
                label: 'Estadisticas',
                icon: 'pi pi-chart-line',
                command: () => this.navigateToRoute('/DashboardDoner'),
              },
              {
                label: 'Lotes',
                icon: 'pi pi-box',
                command: () => this.navigateToRoute('/gestionLotes'),
              },
            ],
          },
          {
            label: 'Donativo',
            icon: 'pi pi-angle-double-down',
            items: [
              {
                label: 'General',
                icon: 'pi pi-desktop',
                command: () => this.navigateToRoute('gestionDonativo'),
              },
            ],
          },
          {
            label: 'Medicamentos',
            icon: 'pi pi-shield',
            items: [
              {
                label: 'General',
                icon: 'pi pi-desktop',
                command: () => this.navigateToRoute('/gestionMedicamentos'),
              },
              {
                label: 'Desecho',
                icon: 'pi pi-trash',
                command: () => this.navigateToRoute('/gestionDesecho'),
              },
              {
                label: 'Estadisticas',
                icon: 'pi pi-chart-line',
                command: () => this.navigateToRoute('/dashboardMedicinas'),
              },
            ],
          },
          {
            label: 'Patologia',
            icon: 'pi pi-heart',
            command: () => this.navigateToRoute('/gestionPatologia'),
          },
          {
            label: 'Comunidades',
            icon: 'pi pi-users',
            command: () => this.navigateToRoute('/gestionComunidad'),
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => this.navigateToRoute('/User'),
          },
        ],
      },

      {
        label: 'Entrega',
        icon: 'pi pi-truck',
        items: [
          {
            label: 'General',
            icon: 'pi pi-desktop',
            command: () => this.navigateToRoute('/gestionEntrega'),
          },
          {
            label: 'Entregado',
            icon: 'pi pi-ticket',
            command: () => this.navigateToRoute('/gestionEntregado'),
          },
          {
            label: 'Expirado',
            icon: 'pi pi-times',
            command: () => this.navigateToRoute('/gestionExpirado'),
          },
          {
            label: 'Estadisticas',
            icon: 'pi pi-chart-line',
            command: () => this.navigateToRoute('/dashboardEntregas'),
          },
        ],
      },
    ];

    this.logoutItem = {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    };
  }

  navigateToRoute(route: string) {
    this.closeSidebar();
    this.router.navigate([route]);
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }

  logout() {
    this.accesoService.logout().subscribe({
      next: (response) => {
        deleteCookie('access_token');
        this.closeSidebar();
        this.router.navigate(['/']);
        console.log(response);
      },
      error: (error) => {
        console.log('Error al cerrar sesión:', error);
      },
    });
  }
  goToDashboard() {
    this.closeSidebar();
    this.router.navigate(['/DashboardDoner']);
  }
}

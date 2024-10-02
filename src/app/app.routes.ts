import { Routes } from '@angular/router';
import { authGuard } from './custom/token.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Authentication/login/login.component'),
  },
  {
    path: 'dashboardMedicinas',
    loadComponent: () =>
      import('./Views/Admin/dash-admin/dash-admin.component'),
    canActivate: [authGuard],
  },
  {
    path: 'dashboardEntregas',
    loadComponent: () =>
      import('./Views/Admin/dasboard-delivered/dasboard-delivered.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearCategoria',
    loadComponent: () =>
      import('./Views/Admin/form-categoria/form-categoria.component'),
    canActivate: [authGuard],
  },

  {
    path: 'crearComunidad',
    loadComponent: () =>
      import('./Views/Admin/form-comunidad/form-comunidad.component'),
    canActivate: [authGuard],
  },

  {
    path: 'crearMedicina',
    loadComponent: () =>
      import('./Views/Admin/form-medicina/form-medicina.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearPaciente',
    loadComponent: () =>
      import('./Views/Admin/form-paciente/form-paciente.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearTratamiento',
    loadComponent: () =>
      import('./Views/Admin/form-tratamiento/form-tratamiento.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearDonacion',
    loadComponent: () =>
      import('./Views/Admin/form-donacion/form-donacion.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearEntrega',
    loadComponent: () =>
      import('./Views/Admin/form-entrega/form-entrega.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionCategoria',
    loadComponent: () =>
      import('./Views/Admin/gestion-categoria/gestion-categoria.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionComunidad',
    loadComponent: () =>
      import('./Views/Admin/gestion-comunidad/gestion-comunidad.component'),
    canActivate: [authGuard],
  },
  {
    path: 'crearPatologia',
    loadComponent: () =>
      import('./Views/Admin/form-patologia/form-patologia.component'),
    canActivate: [authGuard],
  },

  {
    path: 'crearMedicamento',
    loadComponent: () =>
      import('./Views/Admin/form-medicamentos/form-medicamentos.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionComunidad',
    loadComponent: () =>
      import('./Views/Admin/gestion-comunidad/gestion-comunidad.component'),
    canActivate: [authGuard],
  },

  {
    path: 'gestionFundacion',
    loadComponent: () =>
      import('./Views/Admin/gestion-fundacion/gestion-fundacion.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionEntrega',
    loadComponent: () =>
      import('./Views/Admin/gestion-entrega/gestion-entrega.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionEntrega/:id',
    loadComponent: () =>
      import('./Views/Admin/perfil-entrega/perfil-entrega.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionEntregado',
    loadComponent: () =>
      import('./Views/Admin/gestion-entregado/gestion-entregado.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionPaciente',
    loadComponent: () =>
      import('./Views/Admin/gestion-paciente/gestion-paciente.component'),
    canActivate: [authGuard],
  },

  {
    path: 'gestionMedicamentos',
    loadComponent: () =>
      import('./Views/Admin/medicamentos/medicamentos.component'),
    canActivate: [authGuard],
  },

  {
    path: 'gestionDevoluciones',
    loadComponent: () =>
      import('./Views/Admin/devoluciones/devoluciones.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionPatologias',
    loadComponent: () =>
      import('./Views/Admin/patologias/patologias.component'),
    canActivate: [authGuard],
  },

  {
    path: 'gestionPatologia',
    loadComponent: () =>
      import('./Views/Admin/gestion-patologia/gestion-patologia.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionDonativo',
    loadComponent: () =>
      import('./Views/Admin/gestion-donativo/gestion-donativo.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionDonativo/:id',
    loadComponent: () =>
      import('./Views/Admin/perfil-donativo/perfil-donativo.component'),
    canActivate: [authGuard],
  },
  {
    path: 'medicamentosEntrada',
    loadComponent: () =>
      import(
        './Views/Admin/medicamentos-entrada/medicamentos-entrada.component'
      ),
    canActivate: [authGuard],
  },
  {
    path: 'MedicamentosSalidaDonacion',
    loadComponent: () =>
      import(
        './Views/Admin/medicamentos-salida-donacion/medicamentos-salida-donacion.component'
      ),
    canActivate: [authGuard],
  },
  {
    path: 'MedicamentosSalidaOtro',
    loadComponent: () =>
      import(
        './Views/Admin/medicamentos-salida-otro/medicamentos-salida-otro.component'
      ),
    canActivate: [authGuard],
  },

  {
    path: 'gestionDonante',
    loadComponent: () =>
      import('./Views/Admin/gestion-donante/gestion-donante.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionLotes',
    loadComponent: () =>
      import('./Views/Admin/gestion-lotes/gestion-lotes.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionPacienteVulnerable',
    loadComponent: () =>
      import(
        './Views/Admin/gestion-paciente-vulnerable/gestion-paciente-vulnerable.component'
      ),
    canActivate: [authGuard],
  },
  {
    path: 'gestionDesecho',
    loadComponent: () =>
      import('./Views/Admin/gestion-desecho/gestion-desecho.component'),
    canActivate: [authGuard],
  },
  {
    path: 'gestionExpirado',
    loadComponent: () =>
      import('./Views/Admin/gestion-expirado/gestion-expirado.component'),
    canActivate: [authGuard],
  },

  //! esta no esta siendo mostrada

  {
    path: 'DasboardAdmin',
    loadComponent: () =>
      import('./Views/Admin/dash-admin/dash-admin.component'),
    canActivate: [authGuard],
  },
  {
    path: 'DashboardDoner',
    loadComponent: () =>
      import('./Views/Doner/dasboard-doner/dasboard-doner.component'),
    canActivate: [authGuard],
  },
  {
    path: 'User',
    loadComponent: () => import('./Views/Admin/form-user/form-user.component'),
    canActivate: [authGuard],
  },
  {
    path: 'perfilPaciente/:id',
    loadComponent: () =>
      import('./Views/Admin/perfil-paciente/perfil-paciente.component'),
    canActivate: [authGuard],
  },
  {
    path: 'perfilDonador/:id',
    loadComponent: () =>
      import('./Views/Admin/perfil-donante/perfil-donante.component'),
    canActivate: [authGuard],
  },
];

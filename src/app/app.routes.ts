import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        data: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'notes',
        loadComponent: () =>
          import('./features/notes/components/note-list/note-list.component').then(
            (m) => m.NoteListComponent,
          ),
        data: {
          breadcrumb: 'My Notes',
        },
      },
      {
        path: 'archived',
        loadComponent: () =>
          import('./features/archive/archive.component').then(
            (m) => m.ArchiveComponent,
          ),
        data: {
          breadcrumb: 'Archive',
        },
      },
      {
        path: 'trash',
        loadComponent: () =>
          import('./features/trash/trash.component').then(
            (m) => m.TrashComponent,
          ),
        data: {
          breadcrumb: 'Trash',
        },
      },
    ],
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./features/dashboard/dashboard.component').then(
  //       (m) => m.DashboardComponent,
  //     ),
  // },
  /*
      {
        path: 'dashboard',

        canActivate: [authGuard],

        loadComponent: () =>
            import('./features/dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
      },
  */
  {
    path: '**',
    redirectTo: 'login',
  },
];

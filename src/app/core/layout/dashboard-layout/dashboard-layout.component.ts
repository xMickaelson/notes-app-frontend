import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumbs/breadcrumb.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    NavbarComponent,
    BreadcrumbComponent,
    RouterOutlet,
    SidebarComponent,
    ConfirmDialogModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {}

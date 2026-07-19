import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NAVBAR_MENU } from '../../constants/navbar.constant';
import { AppRoutes } from '../../enums/app-routes.enum';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, InputTextModule, AvatarModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuItems: MenuItem[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);
  private confirmService = inject(ConfirmService);

  ngOnInit() {
    this.menuItems = [
      {
        label: NAVBAR_MENU.PROFILE.label,
        icon: NAVBAR_MENU.PROFILE.icon,
        command: () => this.router.navigate([NAVBAR_MENU.PROFILE.route]),
      },
      {
        separator: true,
      },
      {
        label: NAVBAR_MENU.LOGOUT.label,
        icon: NAVBAR_MENU.LOGOUT.icon,
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.confirmService.confirmLogout(() => {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate([AppRoutes.Login]);
        },
      });
    });
  }

  get userInitial(): string {
    return this.authService.userInitials;
  }
}

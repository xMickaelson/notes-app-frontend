import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { SIDEBAR_MENU_ITEMS } from '../../constants/sidebar.constant';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public translateService = inject(TranslateService);
  readonly menuItems: Readonly<MenuItem[]> = SIDEBAR_MENU_ITEMS;
}

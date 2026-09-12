import { AppRoutes } from '../enums/app-routes.enum';
import { AppIcons } from '../enums/icons.enums';
import { MenuItem } from '../models/menu-item.model';

export const SIDEBAR_MENU_ITEMS: Readonly<MenuItem[]> = [
  {
    label: 'Dashboard',
    icon: AppIcons.Dashboard,
    route: AppRoutes.Dashboard,
  },
  {
    label: 'My Notes',
    icon: AppIcons.Notes,
    route: AppRoutes.Notes,
  },
  {
    label: 'Archive',
    icon: AppIcons.Archive,
    route: AppRoutes.Archive,
  },
  {
    label: 'Trash',
    icon: AppIcons.Trash,
    route: AppRoutes.Trash,
  },
  {
    label: 'Shared with Me',
    icon: AppIcons.Share,
    route: AppRoutes.Share,
  },
] as const;

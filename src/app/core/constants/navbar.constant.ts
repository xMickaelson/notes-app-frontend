import { icon } from '@primeuix/themes/aura/avatar';
import { AppRoutes } from '../enums/app-routes.enum';
import { AppIcons } from '../enums/icons.enums';
import { NavBar } from '../enums/navbar.enum';

export const NAVBAR_MENU = {
  PROFILE: {
    label: NavBar.PROFILE,
    icon: AppIcons.User,
    route: AppRoutes.Profile,
  },
  LOGOUT: {
    label: NavBar.LOGOUT,
    icon: AppIcons.SignOut,
  },
} as const;

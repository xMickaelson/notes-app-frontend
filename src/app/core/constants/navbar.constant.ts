import { icon } from '@primeuix/themes/aura/avatar';
import { AppRoutes } from '../enums/app-routes.enum';
import { AppIcons } from '../enums/icons.enums';
import { NavBar, NavBarSort } from '../enums/navbar.enum';

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
  SORT_OPTIONS: [
    {
      label: NavBarSort.NewestFirstLabel,
      value: NavBarSort.NewestFirstValue,
    },
    {
      label: NavBarSort.OldestFirstLabel,
      value: NavBarSort.OldestFirstValue,
    },
    {
      label: NavBarSort.TitleAscLabel,
      value: NavBarSort.TitleAscValue,
    },
    {
      label: NavBarSort.TitleDescLabel,
      value: NavBarSort.TitleDescValue,
    },
  ],
} as const;

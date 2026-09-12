export enum NavBar {
  PROFILE = 'Profile',
  LOGOUT = 'Logout',
}

export enum NavBarSort {
  NewestFirstLabel = 'Newest First',
  NewestFirstValue = 'updatedAt,desc',

  OldestFirstLabel = 'Oldest First',
  OldestFirstValue = 'updatedAt,asc',

  TitleAscLabel = 'Title (A-Z)',
  TitleAscValue = 'title,asc',

  TitleDescLabel = 'Title (Z-A)',
  TitleDescValue = 'title,desc',
}

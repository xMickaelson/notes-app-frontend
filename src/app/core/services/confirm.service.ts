import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmOptions } from '../../shared/models/confirm-options';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private confirmationService = inject(ConfirmationService);
  private translate = inject(TranslateService);
  constructor() {}

  confirm(options: ConfirmOptions): void {
    console.log('opening confirm dialog');

    this.confirmationService.confirm({
      header: options.header,
      message: options.message,
      icon: options.icon ?? 'pi pi-exclamation-triangle',
      acceptLabel: options.acceptLabel ?? 'Yes',
      rejectLabel: options.rejectLabel ?? 'No',
      acceptButtonStyleClass:
        options.acceptButtonStyleClass ?? 'p-button-primary',
      rejectButtonStyleClass:
        options.rejectButtonStyleClass ?? 'p-button-secondary',
      accept: options.accept,
      reject: options.reject,
    });
  }

  confirmDelete(entity: string, accept: () => void, reject?: () => void): void {
    this.confirm({
      header: this.translate.instant('confirmation.delete.header'),

      message: this.translate.instant('confirmation.delete.message', {
        entity,
      }),
      icon: 'pi pi-trash',
      acceptLabel: this.translate.instant('confirmation.buttons.delete'),
      rejectLabel: this.translate.instant('confirmation.buttons.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept,
      reject,
    });
  }

  confirmLogout(accept: () => void, reject?: () => void): void {
    this.confirm({
      header: this.translate.instant('confirmation.logout.header'),
      message: this.translate.instant('confirmation.logout.message'),
      icon: 'pi pi-sign-out',
      acceptLabel: this.translate.instant('confirmation.buttons.logout'),
      rejectLabel: this.translate.instant('confirmation.buttons.cancel'),
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonStyleClass: 'p-button-secondary',
      accept,
      reject,
    });
  }
}

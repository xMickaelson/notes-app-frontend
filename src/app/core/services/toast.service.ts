import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  constructor() {}

  success(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
    });
  }

  error(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
    });
  }

  warning(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
    });
  }

  info(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
    });
  }
}

import { Component, inject, Input } from '@angular/core';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}

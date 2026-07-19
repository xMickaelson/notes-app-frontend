import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error-state',
  imports: [ButtonModule],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss',
})
export class ErrorStateComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonLabel = '';
  @Output() retry = new EventEmitter<void>();
}

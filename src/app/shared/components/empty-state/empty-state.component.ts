import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  imports: [ButtonDirective],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonLabel = '';
  @Output() action = new EventEmitter<void>();
}

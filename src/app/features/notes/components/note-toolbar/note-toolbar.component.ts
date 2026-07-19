import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-toolbar',
  imports: [TranslatePipe, InputText, ButtonDirective, ReactiveFormsModule],
  templateUrl: './note-toolbar.component.html',
  styleUrl: './note-toolbar.component.scss',
})
export class NoteToolbarComponent {
  @Output()
  createClicked = new EventEmitter<void>();

  @Input({ required: true })
  searchControl!: FormControl<string>;
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { NotePermision, ShareNoteRequest } from '../../models/note-share.model';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-share-note',
  imports: [ReactiveFormsModule, Dialog, InputText, Select, FormsModule],
  templateUrl: './share-note.component.html',
  styleUrl: './share-note.component.scss',
})
export class ShareNoteComponent {
  @Input() visible = false;
  @Input() noteId: number | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() share = new EventEmitter<ShareNoteRequest>();

  readonly permissions: NotePermision[] = ['READ', 'EDIT'];
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    permission: ['READ' as NotePermision, Validators.required],
  });

  constructor() {}

  close(): void {
    this.visibleChange.emit(false);
    this.form.reset({
      email: '',
      permission: 'READ',
    });
  }

  onShare(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.share.emit(this.form.getRawValue());
  }
}

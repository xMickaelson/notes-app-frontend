import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Note } from '../../models/note.model';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-note-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
})
export class NoteDialogComponent {
  @Input()
  note: Note | null = null;

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  save = new EventEmitter<{
    title: string;
    content: string;
  }>();

  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.note) {
      this.form.patchValue({
        title: this.note.title,
        content: this.note.content,
      });
    } else {
      this.form.reset();
    }
  }

  onSave() {
    this.save.emit(this.form.getRawValue());
  }
}

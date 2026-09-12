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
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagService } from '../../../tag/services/tag.service';
import { Tag } from '../../../tag/models/tag.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { SaveNoteEvent } from '../../models/save-note-event';

@Component({
  selector: 'app-note-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
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
  save = new EventEmitter<SaveNoteEvent>();

  private fb = inject(NonNullableFormBuilder);
  private readonly tagService = inject(TagService);

  availableTags: Tag[] = [];
  selectedTag: Tag[] = [];

  creatingTag: boolean = false;
  newTagName = '';

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    tags: this.fb.control<Tag[]>([]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.loadTags();
    this.selectedTag = [...(this.note?.tags ?? [])];

    console.log('Note tags:', this.note?.tags);
    console.log('Selected tags:', this.selectedTag);

    if (this.note) {
      this.form.patchValue({
        title: this.note.title,
        content: this.note.content,
      });
    } else {
      this.form.reset();
    }
  }

  onSave(): void {
    const formValue = this.form.getRawValue();

    this.save.emit({
      request: {
        title: formValue.title,
        content: formValue.content,
      },
      tagIds: formValue.tags.map((tag) => tag.id),
    });
  }

  createTag(): void {
    const name = this.newTagName.trim();

    if (!name || this.creatingTag) {
      return;
    }

    this.creatingTag = true;

    this.tagService.createTag(name).subscribe({
      next: (response) => {
        this.availableTags = [...this.availableTags, response];

        const currentTags = this.form.get('tags')?.value ?? [];
        this.form.get('tags')?.setValue([...currentTags, response]);

        this.newTagName = '';
        this.creatingTag = false;
      },
      error: (error) => {
        console.log('failed to create tag', error);
        this.creatingTag = false;
      },
    });
  }

  private loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (response) => {
        this.availableTags = response;
      },
      error: (error) => {
        console.error('tags not found');
      },
    });
  }
}

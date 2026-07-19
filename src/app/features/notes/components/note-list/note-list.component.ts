import { Component, DestroyRef, inject } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { NoteToolbarComponent } from '../note-toolbar/note-toolbar.component';
import { NoteGridComponent } from '../note-grid/note-grid.component';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { CreateNoteRequest } from '../../models/create-note-request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from '../../../../core/services/toast.service';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { NoteSkeletonComponent } from '../../../../shared/components/note-skeleton/note-skeleton.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-note-list',
  imports: [
    NoteToolbarComponent,
    NoteGridComponent,
    NoteDialogComponent,
    EmptyStateComponent,
    NoteSkeletonComponent,
    TranslatePipe,
    ErrorStateComponent,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  notes: Note[] = [];
  loading = false;
  hasError = false;
  dialogVisible = false;
  selectedNote: Note | null = null;

  private noteService = inject(NoteService);
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.loadNotes();
    this.listenForSearch();
  }

  loadNotes(): void {
    this.loading = true;
    this.hasError = false;
    this.noteService.getNotes().subscribe({
      next: (response) => {
        this.notes = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.hasError = true;
      },
    });
  }
  //api is bringing data not populating in UI
  private listenForSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),

        tap(() => {
          this.loading = true;
          this.hasError = true;
        }),

        switchMap((search) => this.noteService.getNotes(search)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (notes) => {
          this.notes = notes;
          this.loading = false;
          this.loadNotes();
        },
        error: () => {
          this.loading = false;
          this.hasError = true;
        },
      });
  }

  saveNote(request: CreateNoteRequest) {
    if (this.selectedNote) {
      this.noteService
        .updateNote(this.selectedNote.id, request)
        .subscribe(() => {
          this.dialogVisible = false;
          this.loadNotes();
        });
    } else {
      this.noteService.createNote(request).subscribe(() => {
        this.dialogVisible = false;
        this.loadNotes();
      });
    }
  }

  openCreateDialog(): void {
    this.selectedNote = null;
    this.dialogVisible = true;
  }

  editNote(id: number): void {
    this.selectedNote = this.notes.find((note) => note.id === id) ?? null;
    this.dialogVisible = true;
  }

  deleteNote(id: number): void {
    this.confirmationService.confirmDelete(
      this.translateService.instant('entities.note'),
      () => {
        this.loading = true;
        this.noteService.deleteNote(id).subscribe({
          next: () => {
            this.loading = false;
            this.toastService.success(
              this.translateService.instant('confirmation.delete.header'),
              this.translateService.instant('confirmation.delete.message'),
            );
            this.loadNotes();
          },
          error: (error) => {
            this.loading = false;
            console.error('Delete note failed', error);

            this.toastService.error(
              'Delete Failed',
              'Failed to delete note. Please try again',
            );
          },
        });
      },
    );
  }

  archiveNote(id: number): void {
    // this.noteService(id).subscribe({
    //   next: () => {
    //     this.loadNotes();
    //   },
    // });
  }
}

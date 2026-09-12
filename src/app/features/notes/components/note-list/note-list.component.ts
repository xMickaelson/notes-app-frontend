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
import { NoteSearchFilter } from '../../models/note-search-filter';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SaveNoteEvent } from '../../models/save-note-event';
import { ShareNoteComponent } from '../share-note/share-note.component';
import { ShareNoteRequest } from '../../models/note-share.model';

@Component({
  selector: 'app-note-list',
  imports: [
    NoteToolbarComponent,
    NoteGridComponent,
    NoteDialogComponent,
    EmptyStateComponent,
    Paginator,
    PaginatorModule,
    ShareNoteComponent,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  myNotes: Note[] = [];
  sharedNotes: Note[] = [];
  loading = false;
  hasError = false;
  dialogVisible = false;
  selectedNote: Note | null = null;
  totalElements: number = 0;
  totalPages: number = 0;

  searchFilter: NoteSearchFilter = {
    page: 0,
    size: 10,
    search: '',
    sort: 'updatedAt,desc',
  };

  private noteService = inject(NoteService);
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  searchControl = new FormControl('', { nonNullable: true });

  shareDialogVisible: boolean = false;
  shareNoteId: number | null = null;

  ngOnInit(): void {
    this.loadNotes();
    this.loadSharedNotes();
    this.listenForSearch();
  }

  loadNotes(): void {
    this.loading = true;
    this.hasError = false;

    this.noteService.getNotes(this.searchFilter).subscribe({
      next: (response) => {
        this.myNotes = response.content;

        this.searchFilter.page = response.page;
        this.searchFilter.size = response.size;

        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.hasError = true;
      },
    });
  }

  loadSharedNotes(): void {
    this.noteService.getSharedNotes().subscribe({
      next: (response) => {
        this.sharedNotes = response;
      },
      error: (error) => {
        console.error('Failed to load shared notes', error);
      },
    });
  }

  private listenForSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((search) => {
        this.searchFilter.search = search ?? '';
        this.searchFilter.page = 0;

        this.loadNotes();
      });
  }

  saveNote(event: SaveNoteEvent): void {
    const { request, tagIds } = event;

    const save$ = this.selectedNote
      ? this.noteService.updateNote(this.selectedNote.id, request)
      : this.noteService.createNote(request);

    save$
      .pipe(
        switchMap((note) => {
          return this.noteService.updateTags(note.id, tagIds);
        }),
      )
      .subscribe({
        next: (updatedNote) => {
          this.dialogVisible = false;
          this.loadNotes();
        },
        error: (error) => {
          this.hasError = true;
        },
      });
  }

  openCreateDialog(): void {
    this.selectedNote = null;
    this.dialogVisible = true;
  }

  editNote(id: number): void {
    this.selectedNote = this.myNotes.find((note) => note.id === id) ?? null;
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
    this.confirmationService.confirm({
      header: 'Archive Note',
      message: 'Archive this Note',
      accept: () => {
        this.noteService.archiveNote(id).subscribe({
          next: () => {
            this.toastService.success(
              'Archived',
              'Note archived successfully.',
            );
            this.loadNotes();
          },
        });
      },
    });
    1;
  }

  onPageChange(event: PaginatorState): void {
    this.searchFilter.page = event.page ?? 0;
    this.searchFilter.size = event.rows ?? 0;

    this.loadNotes();
  }

  onSortChanged(sort: string): void {
    this.searchFilter.sort = sort;
    this.searchFilter.page = 0;
    this.loadNotes();
  }

  openShareDialog(noteId: number): void {
    this.shareNoteId = noteId;
    this.shareDialogVisible = true;
  }

  shareNote(request: ShareNoteRequest): void {
    if (this.shareNoteId === null) {
      return;
    }
    this.noteService.shareNote(this.shareNoteId, request).subscribe({
      next: () => {
        this.shareDialogVisible = false;
      },
      error: (error) => {
        console.error('Failed to share note', error);
      },
    });
  }
}

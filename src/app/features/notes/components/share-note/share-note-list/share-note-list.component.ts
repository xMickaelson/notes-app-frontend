import { Component, DestroyRef, inject } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../models/note.model';
import { NoteToolbarComponent } from '../../note-toolbar/note-toolbar.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NoteSearchFilter } from '../../../models/note-search-filter';
import { NoteDialogComponent } from '../../note-dialog/note-dialog.component';
import { ShareNoteComponent } from '../share-note.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { NoteGridComponent } from '../../note-grid/note-grid.component';

@Component({
  selector: 'app-share-note-list',
  imports: [
    NoteToolbarComponent,
    NoteDialogComponent,
    ShareNoteComponent,
    Paginator,
    PaginatorModule,
    EmptyStateComponent,
    NoteGridComponent,
  ],
  templateUrl: './share-note-list.component.html',
  styleUrl: './share-note-list.component.scss',
})
export class ShareNoteListComponent {
  sharedNotes: Note[] = [];
  searchControl = new FormControl('', { nonNullable: true });
  selectedNote: Note | null = null;
  searchFilter: NoteSearchFilter = {
    page: 0,
    size: 10,
    search: '',
    sort: 'updatedAt,desc',
  };
  loading: boolean = false;
  dialogVisible = false;
  totalElements: number = 0;

  private readonly noteService = inject(NoteService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadSharedNotes();
    this.listenForSearch();
  }

  private loadSharedNotes(): void {
    this.loading = true;

    this.noteService.getSharedNotes().subscribe({
      next: (response) => {
        this.sharedNotes = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load shared notes', error);
        this.loading = false;
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

        this.loadSharedNotes();
      });
  }

  editNote(id: number): void {
    const note = this.sharedNotes.find((value) => value.id === id);

    if (!note) {
      return;
    }

    if (note.permission !== 'EDIT') {
      return;
    }

    this.selectedNote = note;
    this.dialogVisible = true;
  }

  deleteNote(event: any): void {}

  archiveNote(event: any): void {}

  openShareDialog(event: any): void {}

  openCreateDialog(): void {}

  onSortChanged(sort: string): void {}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteCardComponent } from '../note-card/note-card.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-note-grid',
  imports: [NoteCardComponent],
  templateUrl: './note-grid.component.html',
  styleUrl: './note-grid.component.scss',
})
export class NoteGridComponent {
  @Input()
  notes: Note[] = [];

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  archive = new EventEmitter<number>();

  @Output()
  share = new EventEmitter<number>();

  @Input()
  isShared = false;

  @Input()
  permission?: 'READ' | 'EDIT';
}

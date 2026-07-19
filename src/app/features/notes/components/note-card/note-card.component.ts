import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  imports: [TranslatePipe, CardModule, ButtonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input({ required: true })
  note!: Note;

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  archive = new EventEmitter<number>();
}

import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-note-skeleton',
  imports: [SkeletonModule],
  templateUrl: './note-skeleton.component.html',
  styleUrl: './note-skeleton.component.scss',
})
export class NoteSkeletonComponent {}

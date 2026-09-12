import { CreateNoteRequest } from './create-note-request';

export interface SaveNoteEvent {
  request: CreateNoteRequest;
  tagIds: number[];
}

export type NotePermision = 'READ' | 'EDIT';

export interface ShareNoteRequest {
  email: string;
  permission: NotePermision;
}

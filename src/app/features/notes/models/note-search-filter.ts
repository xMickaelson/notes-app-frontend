export interface NoteSearchFilter {
  page: number;
  size: number;
  search: string;
  sort: string;
  tagId?: number;
  archived?: boolean;
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from '../models/note.model';
import { CreateNoteRequest } from '../models/create-note-request';
import { UpdateNoteRequest } from '../models/update-note-request';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page-response.model';
import { NoteSearchFilter } from '../models/note-search-filter';
import { ShareNoteRequest } from '../models/note-share.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly API = `${environment.apiUrl}/notes`;
  private readonly SHARE_API = 'http://localhost:8080/api/note-shares';

  constructor(private http: HttpClient) {}

  getNotes(searchFilter: NoteSearchFilter): Observable<PageResponse<Note>> {
    let params = new HttpParams()
      .set('page', searchFilter.page)
      .set('size', searchFilter.size)
      .set('sort', searchFilter.sort);

    if (searchFilter.search.trim()) {
      params = params.set('search', searchFilter.search);
    }

    return this.http.get<PageResponse<Note>>(this.API, { params });
  }

  getNote(Id: number) {
    return this.http.get<Note>(`${this.API}/${Id}`);
  }

  createNote(request: CreateNoteRequest): Observable<Note> {
    return this.http.post<Note>(this.API, request);
  }

  updateNote(Id: number, request: UpdateNoteRequest): Observable<Note> {
    return this.http.put<Note>(`${this.API}/${Id}`, request);
  }

  deleteNote(Id: number) {
    return this.http.delete<void>(`${this.API}/${Id}`);
  }

  archiveNote(Id: number) {
    return this.http.put<void>(`${this.API}/${Id}/archive`, {});
  }

  updateTags(noteId: number, tagIds: number[]): Observable<Note> {
    return this.http.put<Note>(`${this.API}/${noteId}/tags`, { tagIds });
  }

  shareNote(noteId: number, request: ShareNoteRequest): Observable<void> {
    return this.http.post<void>(`${this.SHARE_API}/${noteId}/share`, request);
  }

  getSharedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.SHARE_API}/shared`);
  }
}

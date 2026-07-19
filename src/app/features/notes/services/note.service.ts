import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from '../models/note.model';
import { CreateNoteRequest } from '../models/create-note-request';
import { UpdateNoteRequest } from '../models/update-note-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly API = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  getNotes(search?: string): Observable<Note[]> {
    let params = new HttpParams();
    if (search && search.trim()) {
      params = params.set('search', search);
    }

    return this.http.get<Note[]>(this.API, { params });
  }

  getNote(Id: number) {
    return this.http.get<Note>(`${this.API}/${Id}`);
  }

  createNote(request: CreateNoteRequest) {
    return this.http.post<Note>(this.API, request);
  }

  updateNote(Id: number, request: UpdateNoteRequest) {
    return this.http.put<Note>(`${this.API}/${Id}`, request);
  }

  deleteNote(Id: number) {
    return this.http.delete<void>(`${this.API}/${Id}`);
  }
}

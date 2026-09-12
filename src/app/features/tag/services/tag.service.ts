import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { API } from '../../../core/constants/endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(API.TAGS);
  }

  createTag(name: string): Observable<Tag> {
    return this.http.post<Tag>(API.TAGS, { name });
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }
}

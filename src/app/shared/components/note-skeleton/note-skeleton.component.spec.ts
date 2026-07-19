import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSkeletonComponent } from './note-skeleton.component';

describe('NoteSkeletonComponent', () => {
  let component: NoteSkeletonComponent;
  let fixture: ComponentFixture<NoteSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

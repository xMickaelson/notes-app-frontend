import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNoteListComponent } from './share-note-list.component';

describe('ShareNoteListComponent', () => {
  let component: ShareNoteListComponent;
  let fixture: ComponentFixture<ShareNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareNoteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

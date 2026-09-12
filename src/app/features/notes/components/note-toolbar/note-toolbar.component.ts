import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NAVBAR_MENU } from '../../../../core/constants/navbar.constant';
import { NavBarSort } from '../../../../core/enums/navbar.enum';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-note-toolbar',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TranslatePipe,
    SelectModule,
  ],
  templateUrl: './note-toolbar.component.html',
  styleUrl: './note-toolbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoteToolbarComponent {
  @Output()
  createClicked = new EventEmitter<void>();

  @Input({ required: true })
  searchControl!: FormControl<string>;

  @Output()
  sortChanged = new EventEmitter<string>();

  onSortChange(): void {
    this.sortChanged.emit(this.selectedSort);
  }

  sortOptions = [...NAVBAR_MENU.SORT_OPTIONS];
  selectedSort = NavBarSort.NewestFirstValue;
}

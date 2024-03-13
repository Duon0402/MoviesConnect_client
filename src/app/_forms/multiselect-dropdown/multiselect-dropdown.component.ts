import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropdownItem } from '../../_models/dropdownItem';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css',
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() dropdownList: DropdownItem[] = [];
  @Output() selectedItemsChange = new EventEmitter<DropdownItem[]>();

  dropdownSettings: IDropdownSettings = {};
  selectedItems: DropdownItem[] = [];

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
  }

  onDropDownClose() {
    this.emitSelectedItems();
  }

  private emitSelectedItems() {
    this.selectedItemsChange.emit(this.selectedItems);
  }
}

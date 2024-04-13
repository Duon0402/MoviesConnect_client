import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropdownItem } from '../../_models/dropdownItem';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css',
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() dropdownList: DropdownItem[] = [];
  @Input() resetFilter: boolean = false;
  @Input() selectedItems: DropdownItem[] = [];
  @Output() selectedItemsChange = new EventEmitter<DropdownItem[]>();

  dropdownSettings: IDropdownSettings = {};


  ngOnInit() {
    this.initializeDropdownSettings();
  }

  onDropDownClose() {
    this.emitSelectedItems();
  }

  private emitSelectedItems() {
    this.selectedItemsChange.emit(this.selectedItems);
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    this.emitSelectedItems();
  }

  onItemDeSelect(item: any) {
    const index = this.selectedItems.findIndex(i => i.item_id === item.item_id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
    this.emitSelectedItems();
  }

  initializeDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
  }
}

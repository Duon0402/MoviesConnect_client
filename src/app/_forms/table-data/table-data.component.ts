import { TableColumn } from './../../_models/tableColumn';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css',
})
export class TableDataComponent implements OnInit, AfterViewInit {
  @Input() tableColumns: TableColumn[] = [];
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Output() rowSelected = new EventEmitter<any>();

  selectedRow: any;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map(
      (column) => column.displayedColumn
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onRowClick(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
    this.rowSelected.emit(this.selectedRow);
  }

  isRowSelected(row: any) {
    return this.selectedRow === row;
  }
}

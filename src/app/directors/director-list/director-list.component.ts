import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrl: './director-list.component.css'
})
export class DirectorListComponent implements OnInit{
  @ViewChild(MatInput, { static: true }) input!: MatInput;
  directors!: DirectorOutputDto[];
  filteredDirectors!: DirectorOutputDto[];

  constructor(private _service: ProxiesService) {}

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors() {
    this._service.getListDirectors().subscribe(result => {
      this.directors = result;
      this.filteredDirectors = [...this.directors]; // Sao chép danh sách đạo diễn ban đầu để lọc
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredDirectors = this.directors.filter(director =>
      director.name?.toLowerCase().includes(filterValue)
    );
  }
}

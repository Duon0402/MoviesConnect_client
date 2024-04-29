import { Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent {
  @ViewChild(MatInput, { static: true }) input!: MatInput;
  actors!: ActorOutputDto[];
  filteredActors!: ActorOutputDto[];

  constructor(private _service: ProxiesService) {}

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors() {
    this._service.getListActors().subscribe(result => {
      this.actors = result;
      this.filteredActors = [...this.actors]; // Sao chép danh sách đạo diễn ban đầu để lọc
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredActors = this.actors.filter(actor =>
      actor.name?.toLowerCase().includes(filterValue)
    );
  }
}

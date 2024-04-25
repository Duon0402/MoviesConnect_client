import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import {
  ProxiesService,
  StatisticsDto,
} from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  statistics!: StatisticsDto;

  constructor(private _service: ProxiesService, public accountService: AccountService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this._service.getStatistics().subscribe((result) => {
      this.statistics = result;
    });
  }
}

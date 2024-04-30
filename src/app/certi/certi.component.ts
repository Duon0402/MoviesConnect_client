import { CertificationOutputDto } from './../../shared/service-proxies/proxies.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxiesService } from '../../shared/service-proxies/proxies.service';
import { MoviesParams } from '../_models/movieParams';

@Component({
  selector: 'app-certi',
  templateUrl: './certi.component.html',
  styleUrl: './certi.component.css'
})
export class CertiComponent {
  certi!: any;
  certiId!: any;
  moviesParams: MoviesParams = {};
  constructor(
    private route: ActivatedRoute,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    this.certiId = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesParams = {
      certificationId: [this.certiId],
      orderBy: 'score',
      sortOrder: 'desc',
      pageSize: 10,
    };
    this.loadCerti(this.certiId);
  }
  loadCerti(genreId: any) {
    this._service.getCertificationById(genreId).subscribe((result) => {
      this.certi = result;
    });
  }
}

import { MovieService } from './../../_services/movie.service';
import { MoviesParams } from './../../_models/movieParams';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ListMoviesOutputDto,
  MemberDto,
} from '../../../shared/service-proxies/proxies.service';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  member!: MemberDto;
  movies: ListMoviesOutputDto[] = [];

  activeTab!: TabDirective;

  constructor(
    private memberService: MemberService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data['member'];
    });

    // this.route.queryParams.subscribe((params) => {
    //   params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    // });
  }

  loadWatchlist() {
    this.movieService.getWatchList(this.member.id).subscribe((movies) => {
      this.movies = movies;
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Watchlist' && this.movies.length === 0) {
      this.loadWatchlist();
    }
  }
}

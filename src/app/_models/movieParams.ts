export class MoviesParams {
  keyword?: string;
  orderBy?: string;
  sortOrder?: string;
  pageSize?: number;
  status?: string;
  certificationId?: number[];
  genreId?: number[];
  actorId?: number[];
  directorId?: number[];
  purpose?: string;
  maxRating?: number;
  minRating?: number;
}

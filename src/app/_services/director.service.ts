import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrEditDirector(model: any, directorId?: number,) {
    if(directorId != null && directorId != 0) {
      return this.http.put(this.baseUrl + 'Director/UpdateDirector/' + directorId, model);
    }
    else {
      return this.http.post(this.baseUrl + 'Director/CreateDirector', model);
    }
  }

  deleteDirector(directorId: number) {
    return this.http.delete(this.baseUrl + 'Director/DeleteDirector/' + directorId);
  }

  changeDirectorImage(file: File, directorId: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.baseUrl + 'Director/SetDirectorImage/' + directorId,
      formData
    );
  }
}

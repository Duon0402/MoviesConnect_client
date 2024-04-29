import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrEditActor(model: any, actorId?: number,) {
    if(actorId != null && actorId != 0) {
      return this.http.put(this.baseUrl + 'Actor/UpdateActor/' + actorId, model);
    }
    else {
      return this.http.post(this.baseUrl + 'Actor/CreateActor', model);
    }
  }

  deleteActor(actorId: number) {
    return this.http.delete(this.baseUrl + 'Actor/DeleteActor/' + actorId);
  }

  changeActorImage(file: File, actorId: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.baseUrl + 'Actor/SetActorImage/' + actorId,
      formData
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Game} from "../_models/game.model.";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private http: HttpClient) {
  }

  nextQuestion(game_id: string) {
    return this.http.get(`${environment.apiUrl}/api/questions/nextQuestion`, {params: {game_id}});
  }
}

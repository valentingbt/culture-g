import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  constructor(private http: HttpClient) { }

  checkAnswer(answer_id:string, game_id:string) {
    return this.http.post(`${environment.apiUrl}/api/answers/checkAnswer`, {answer_id, game_id});
  }
}

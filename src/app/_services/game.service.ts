import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Game} from "../_models/game.model.";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http: HttpClient) {
  }

  startGame(game: Game) {
    return this.http.post<Game>(`${environment.apiUrl}/api/games/startGame`, game);
  }

  gamesByUser(user_id: string) {
    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/api/games`, {params: {query : JSON.stringify({user_id}) }});
  }
}

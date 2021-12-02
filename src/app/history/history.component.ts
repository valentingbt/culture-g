import {Component, OnInit} from '@angular/core';
import {Game} from "../_models/game.model.";
import {GameService} from "../_services/game.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  games: Array<any>;

  constructor(private gameService: GameService) {
  }


  ngOnInit(): void {
    this.gameService.gamesByUser(JSON.parse(<string>localStorage.getItem('user')).id)
      .pipe(first())
      .subscribe((games: any) => {
        console.log(games.rows)
        this.games = games.rows
      });
  }

  parseDate(date: string) {
    const gameDate = new Date(date);
    return `${gameDate.getDate()}/${gameDate.getMonth()}/${gameDate.getFullYear()} ${gameDate.getHours()}:${gameDate.getMinutes()}`
  }

  translateDificulty(d: number) {
    if (d === 1) {
      return 'Facile'
    } else if (d === 2) {
      return 'Moyen'
    } else if (d === 3) {
      return "Difficile"
    }
    return '';
  }

}

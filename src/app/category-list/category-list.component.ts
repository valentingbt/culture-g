import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../_services/category.service";
import {first} from "rxjs/operators";
import {Category} from "../_models/category";
import {GameService} from "../_services/game.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Output() start: EventEmitter<any> = new EventEmitter();

  categories: Category[];
  gameCategoryID: string;
  gameDifficulty: number;
  gameNbQuestion: number;

  constructor(private categoryService: CategoryService, private gameService: GameService) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .pipe(first())
      .subscribe(categories => this.categories = categories.rows);
  }

  chooseCategory(id:string) {
    this.gameCategoryID = id;
  }

  chooseDifficulty(difficulty:number) {
    this.gameDifficulty = difficulty;
  }

  startGame() {
    this.gameService.startGame({
      nb_questions:this.gameNbQuestion,
      difficulty: this.gameDifficulty,
      category_id: this.gameCategoryID,
      user_id: JSON.parse(<string>localStorage.getItem('user')).id
    })
      .pipe(first())
      .subscribe(gameInfo => this.start.emit(gameInfo));
  }



}

import {Component, OnInit} from '@angular/core';
import {Answer} from "../_models/answer";
import {AnswerService} from "../_services/answer.service";
import {first} from "rxjs/operators";
import {QuestionService} from "../_services/question.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  hideConfig: boolean = false;
  question: any;
  answers: Array<Answer>
  gameId: string;
  isCorrect: any;
  endGame: any;
  nbPoints: number = 0;

  constructor(private answerService: AnswerService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }


  showQuestion(gameInfo: any) {
    this.hideConfig = true;
    this.question = gameInfo.nextQuestion;
    this.answers = gameInfo.answers;
    this.gameId = gameInfo.gameId;
  }

  answerQuestion(id: string) {
    this.answerService.checkAnswer(id, this.gameId)
      .pipe(first())
      .subscribe(isCorrect => {
        this.isCorrect = isCorrect
        if (isCorrect) {
          this.nbPoints++
        }
      });

    setTimeout(() => {
      this.isCorrect = null;
      this.questionService.nextQuestion(this.gameId)
        .pipe(first())
        .subscribe((question: any) => {
          if(question === "end game") {
            this.endGame = true;
          } else {
            this.question = question.nextQuestion;
            this.answers = question.answers;
          }

        });
    },3000)




  }

}

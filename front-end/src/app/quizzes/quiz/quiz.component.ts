import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Game} from "../../../models/game.model";
import {GameService} from "../../../services/game.service";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  gameSelected: EventEmitter<Game> = new EventEmitter<Game>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  public isAlreadyStart: boolean;
  public user: User;
  public games: Game[];

  constructor( public userService: UserService, public gameService: GameService, public quizServide: QuizService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.gameService.games$.subscribe((games: Game[]) => {
      this.isAlreadyStart = false;
      console.log("GAME", games.length);
      this.games = games;
    });
    /*this.quizService.quizSelected$.subscribe(quiz => this.quiz = quiz);*/
  }

  ngOnInit(): void {
  }

  alreadyStart(): void {
    this.isAlreadyStart = true;
  }

  reDoQuiz(game: Game): void {
    this.gameService.deleteGame(game);
    this.quizSelected.emit(this.quiz);
  }

  continueQuiz(game: Game): void {
    this.gameSelected.emit(game);
  }

  selectQuiz(): void {
    this.quizSelected.emit(this.quiz);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }
}

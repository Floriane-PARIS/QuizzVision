import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Game} from "../../../models/game.model";
import {GameService} from "../../../services/game.service";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  user: User;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  gameSelected: EventEmitter<Game> = new EventEmitter<Game>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  public isAlreadyStart: boolean;
  // public user: User;
  public games: Game[];

  constructor( public userService: UserService, public gameService: GameService, public quizService: QuizService, public router: Router) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.gameService.games$.subscribe((games: Game[]) => {
      this.isAlreadyStart = false;
      console.log('GAME', games.length);
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
    this.quizService.setSelectedQuiz(this.quiz.id);
    this.gameService.deleteGame(game);
    this.quizSelected.emit(this.quiz);
  }

  continueQuiz(game: Game): void {
    this.quizService.setSelectedQuiz(this.quiz.id);
    this.gameSelected.emit(game);
  }

  selectQuiz(): void {
    this.hasConfiguration();
    this.quizSelected.emit(this.quiz);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }

  hasConfiguration(): Boolean{
    if(this.user.configurations == undefined){
      console.log("créer une configuration!!!");
      return true;
    }
    return false;
  }

  /*modif(): void{
    this.quizService.origin = true;
    this.router.navigate(['/edit-quiz/' + this.quiz.id]);
  }*/
}

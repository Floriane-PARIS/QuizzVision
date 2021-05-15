import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
import { Game } from '../../../models/game.model';
import {Answer, Question} from '../../../models/question.model';
import {Configuration} from '../../../models/configuration.model';
import {max} from "rxjs/operators";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {



  public game: Game;
  public idUser: string;
  public answer: Answer;
  public message: string;
  public isValided: boolean;
  public gameQuestion: Question;
  public configuration: Configuration;
  public length: number;
  public root = document.documentElement;


  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private gameService: GameService, private userService: UserService) {
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
      if (this.length === 0) {
        this.length = this.game.score;
      }
    });
    this.quizService.quizSelected$.subscribe( (quiz) => {
      this.length = quiz.questions.length;
    });
    this.userService.configurationNext$.subscribe((configuration) => {
      this.configuration = configuration;
      this.shift();
    });
    this.isValided = false;
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(this.idUser);
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.setSelectedGame(id);
  }

  shift(): void {
    const value = this.configuration.shift;
    this.root.style.setProperty('--slider', value.toString());
  }

  valideAnswer(answer: Answer): void {
    this.gameService.addAnswer(this.game, answer);
    this.answer = answer;
  }

  isValideAnswer(question: Question): void {
    if(this.answer !== undefined){
      this.isValided = true;
    if (this.answer.isCorrect) {
      this.message = 'Bravo, bonne réponse';
    }
    else  {
      this.gameService.updateScore(this.game);
      this.message = 'Hoooooooo, mauvaise réponse';
    }
    }

  }

  // changes
  next(): void {
    this.answer = undefined;
    this.message = '';
    this.isValided = false;
    // this.gameService.nextQuestion(this.game);
    this.gameService.nextQuestionGame(this.game);
    console.log('Nous passons à la prochaine question^^!');
  }

  sendConfig(): void {
    this.router.navigate(['/configuration-jeu/' + this.idUser + '/' + this.game.id]);
  }

  /*quitGame(): void {
    // this.gameService.deleteGame(this.game);

    this.gameService.updateGameConfiguration(this.game, this.configuration);
    this.backToQuizList();
    /*this.gameService.setSelectedGame(undefined);
    this.quizService.setSelectedQuiz(undefined);
    this.router.navigate(['/quiz-list/' + this.idUser]);
  }*/

  backToQuizList(): void {
    if (this.game.question[0] === null) {
      this.gameService.updateGameConfiguration(this.game, this.configuration);
    } else {
      this.gameService.setSelectedGame(undefined);
    }
    this.quizService.setSelectedQuiz(undefined);
    this.router.navigate(['/quiz-list/' + this.idUser ]);
  }

  getResultat(): string {
      return this.game.score +" / "+this.length;
  }

  getBold(): string{
      if(this.configuration != undefined){
           return this.configuration.bold;
      }
       return 'normal';
  }


  getPolice(): string{
      if(this.configuration != undefined){
         return this.configuration.police;
      }
      return 'Arial';
  }

  getSize(): string{
      if(this.configuration != undefined){
        return this.configuration.size+"px";
      }
      return "22px";
  }

  getBright(): string{
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%";
  }

  getContrast(): string{
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%";
  }

  getFiltre(): string{
      return this.getBright() + " " + this.getContrast();
  }

}

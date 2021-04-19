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
  public score: number;
  public length: number;
  public root = document.documentElement;


  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService, private userService: UserService) {
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
      this.length = game.score;
    });
    this.userService.configurationNext$.subscribe((configuration) => {
      this.configuration = configuration;
      console.log('game', configuration);
      this.shift();
    });
    this.isValided = false;
    this.score = 0;
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(this.idUser);
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.setSelectedGame(id);
  }

  shift(): void {
    const value = this.configuration.shift;
    console.log('value', value);
    this.root.style.setProperty('--slider', value.toString());
  }

  valideAnswer(answer: Answer): void {
    this.gameService.addAnswer(this.game, answer);
    this.answer = answer;
    console.log('answer', this.answer);
  }

  isValideAnswer(question: Question): void {
    if(this.answer !== undefined){
      this.isValided = true;
    if (this.answer.isCorrect) {
      this.score = this.score+1;
      // this.gameService.updateScore(this.game);
      this.message = 'Bravo, bonne réponse';
    }
    else  {
      this.message = 'Hoooooooo, mauvaise réponse';
    }
    }

  }

  // changes
  next(): void {
    console.log(this.game);
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

  quitGame(): void {
    // this.gameService.deleteGame(this.game);
    this.gameService.setSelectedGame(undefined);
    this.router.navigate(['/quiz-list/' + this.idUser]);
  }

  backToQuizList(): void {
    this.gameService.setSelectedGame(undefined);
    this.router.navigate(['/quiz-list/' + this.idUser ]);
  }

  getBold(){
      if(this.configuration != undefined){
           return this.configuration.bold;
      }
       return 'normal';
  }


  getPolice(){
      if(this.configuration != undefined){
         return this.configuration.police;
      }
      return 'Arial';
  }

  getSize(){
      if(this.configuration != undefined){
        return this.configuration.size+"px";
      }
      return "22px";
  }

  getBright(){
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%"
  }

  getContrast(){
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%"
  }

  getFiltre(){
      return this.getBright() + " " + this.getContrast();
  }

}

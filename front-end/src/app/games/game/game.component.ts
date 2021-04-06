import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
import { Game } from '../../../models/game.model';
import {Answer, Question} from '../../../models/question.model';
import {Configuration} from '../../../models/configuration.model';
import {ConfigurationService} from '../../../services/configuration.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game;
  public answer: Answer;
  public message: string;
  public isValided: boolean;
  public gameQuestion: Question;
  public configuration: Configuration;


  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService, private configurationService: ConfigurationService) {
    this.gameService.gameSelected$.subscribe((game) => this.game = game);
    this.configuration = configurationService.lastConfiguration();
    this.isValided = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.setSelectedGame(id);
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
      this.message = 'Bravo, bonne réponse';
    }
    else  {
      this.message = 'Hoooooooo, mauvaise réponse';
    }
    }
    
  }

  isNotNull(game: Game): boolean {
    if(game.id != null){
      return true;
    }
    console.log('nok');
    return false;
  }

  // changes
  next(): void {
    console.log(this.game);
    this.answer = undefined;
    this.message = '';
    this.isValided = false;
    // this.gameService.nextQuestion(this.game);
    this.gameService.nextQuestionGame(this.game);
    console.log('nous passons à la prochaine question^^!');
  }


  quitGame() {
    this.gameService.deleteGame(this.game);
    this.router.navigate(['/quiz-list']);
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
}
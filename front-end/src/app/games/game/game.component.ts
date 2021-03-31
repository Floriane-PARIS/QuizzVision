import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
import { Game } from '../../../models/game.model';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game;
  public answer: Answer;
  public message: string;
  public gameQuestion: Question;


  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    this.gameService.gameSelected$.subscribe((game) => this.game = game);
    //this.gameQuestion.id = gameService.get   récupérer l'id de la question actuelle du game
   //placer un observale sur cet id
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
    if (this.answer.isCorrect) {
      this.message = 'Bravo, bonne réponse';
    }
    else  {
      this.message = 'Hoooooooo, mauvaise réponse';
    }
  }

  isNotNull(game: Game): boolean {
    if(game.id != null){
      return true;
      console.log("ok");
    }
    console.log("nok")
    return false;
  }

  //changes
  next(): void {
  this.gameService.nextQuestion(this.game);
  console.log("nous passons à la prochaine question^^!")
  }

}

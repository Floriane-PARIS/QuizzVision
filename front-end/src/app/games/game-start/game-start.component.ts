import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Game } from '../../../models/game.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {GameService} from '../../../services/game.service';
import {Configuration} from '../../../models/configuration.model';
import {ConfigurationService} from '../../../services/configuration.service';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {

  public quiz: Quiz;
  public gameForm: FormGroup;
  public game: Game;
  public configuration: Configuration;

  constructor(private router: Router, public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService, private gameService: GameService, private configurationService: ConfigurationService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.initializeGameForm(quiz);
    });

    this.configuration = configurationService.lastConfiguration();
    //console.log("[Configuration1] ", this.configuration);

    /*this.configurationService.configurationSelected$.subscribe((configuration) =>{
          this.configuration = configurationService.lastConfiguration();
          console.log("[Configuration2] ", this.configuration);
    });*/

    this.gameService.selectedGameId$.subscribe((gameId) =>{
      this.startGame(gameId);
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  private initializeGameForm(quiz: Quiz): void {
    if (quiz.questions.length > 0 ) {
      this.gameForm = this.formBuilder.group({
        quizId: [quiz.id],
        question: [[quiz.questions[0]]]
      });
    }
  }

  addGame(): void {
    const gameToCreate = this.gameForm.getRawValue() as Game;
    this.gameService.addGame(gameToCreate);
  }

  startGame(string: string): void {
    console.log('event received from child:', string);
    this.router.navigate(['/game/' + string ]);
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

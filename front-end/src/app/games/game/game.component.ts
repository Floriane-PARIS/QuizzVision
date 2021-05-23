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
import {AnimateurService} from "../../../services/animateur.service";

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
  public newGame: Quiz;
  public animateurId: string;
  public root = document.documentElement;


  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private animateurService: AnimateurService, private gameService: GameService, private userService: UserService) {
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
      if (this.length === 0) {
        this.length = this.game.score;
      }
      this.quizService.quizzes$.subscribe((quizList) => {
        this.newGame = null;
        this.findNewQuiz(quizList);
        });
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
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  findNewQuiz(quizList: Quiz[]): void {
    if (quizList.length < 2) {
      return;
    } else {
      const i = Math.floor(Math.random() * quizList.length - 1);
      if (quizList[i] == undefined) {
        this.findNewQuiz(quizList);
      }
      if ((this.game.quizId != quizList[i].id) && (quizList[i].questions.length > 0)) {
        this.newGame = quizList[i];
        console.log('NEW4' + this.newGame.name);
      } else {
        this.findNewQuiz(quizList);
      }
    }
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
      this.message = 'Bravo, bonne réponse !';
    }
    else  {
      this.gameService.updateScore(this.game);
      this.message = 'Hoooooooo, mauvaise réponse !';
      for (const answer of this.game.question[0].answers) {
        if (answer.isCorrect) {
          this.message = this.message + ' Une bonne réponse est "' + answer.value + '".';
        }
      }
    }
    this.message = this.message + ' Cliquer sur Question Suivante';
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
    this.router.navigate(['/' + this.animateurId + '/configuration-jeu/' + this.idUser + '/' + this.game.id]);
  }

  backToQuizList(): void {
    if (this.game.question[0] === null) {
      this.gameService.updateGameConfiguration(this.game, this.configuration);
    } else {
      this.gameService.setSelectedGame(undefined);
    }
    this.quizService.setSelectedQuiz(undefined);
    this.router.navigate(['/' + this.animateurId + '/quiz-list/' + this.idUser ]);
  }

  otherGames(): void {
    this.gameService.updateGameConfiguration(this.game, this.configuration);
    this.quizService.setSelectedQuiz(this.newGame.id);
    console.log('event received from child:', this.newGame.id);
    this.router.navigate(['/' + this.animateurId +'/game-start/' + this.idUser + '/' + this.newGame.id]);
  }

  getResultat(): string {
      return this.game.score +" / "+this.length;
  }

  getBold(): string{
      return this.gameService.getBold(this.configuration);
  }

  getPolice(): string{
      return this.gameService.getPolice(this.configuration);
  }

  getSize(): string{
      return this.gameService.getSize(this.configuration);
  }

  getFiltre(): string{
      return this.gameService.getFiltre(this.configuration);;
  }

}

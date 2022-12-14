import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Game } from '../../../models/game.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {GameService} from '../../../services/game.service';
import {Configuration} from '../../../models/configuration.model';
import {User} from '../../../models/user.model';
import {UserService} from "../../../services/user.service";
import {CommonModule} from "@angular/common";
import {AnimateurService} from "../../../services/animateur.service";

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {

  public quiz: Quiz;
  public gameForm: FormGroup;
  public game: Game;
  public user: User;
  public configuration: Configuration;
  public animateurId: string;

  constructor(private router: Router, public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService, private animateurService: AnimateurService, private gameService: GameService, private userService: UserService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      // console.log('gamQuiz', quiz);
      // this.initializeGameForm(quiz);
      this.userService.userSelected$.subscribe((user) => {
        this.user = user;
        this.userService.configurationNext$.subscribe((configuration) => {
          this.initializeGameForm(quiz, configuration);
        });
      });
    });
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      console.log('gamUser2', user);
    });
    this.userService.configurationNext$.subscribe((configuration) => {
      this.configuration = configuration;
      console.log('gamMe', configuration);
    });

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
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  private initializeGameForm(quiz: Quiz, configuration: Configuration): void {
    if (quiz.questions.length > 0 ) {
      this.gameForm = this.formBuilder.group({
        userId: [this.user.id],
        quizId: [quiz.id],
        question: [[quiz.questions[0]]],
        score: [quiz.questions.length],
        date: [this.currentDate()],
        configuration: [[configuration]],
      });
    }
  }

  currentDate(): Date {
    const currentDate = new Date();
    return currentDate;
  }

  addGame(): void {
    const gameToCreate = this.gameForm.getRawValue() as Game;
    this.gameService.addGame(gameToCreate);
  }

  backToQuizList(): void {
    this.quizService.setSelectedQuiz(undefined);
    this.router.navigate(['/' + this.animateurId + '/quiz-list/' + this.user.id]);
  }

  backToConfiguration(): void {
    this.quizService.setSelectedQuiz(undefined);
    this.router.navigate(['/' + this.animateurId + '/configuration-edit/' + this.user.id]);
  }

  startGame(string: string): void {
    this.quizService.setSelectedQuiz(this.quiz.id);
    console.log('event received from child:', string);
    this.router.navigate(['/' + this.animateurId + '/game/' + this.user.id + '/' + string  ]);
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

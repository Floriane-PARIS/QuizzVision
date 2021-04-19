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

  constructor(private router: Router, public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService, private gameService: GameService, private userService: UserService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log('gamQuiz', quiz);
      this.userService.userSelected$.subscribe((user) => {
        this.user = user;
        console.log('gamUser', user);
        this.initializeGameForm(quiz);
      });
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
  }

  private initializeGameForm(quiz: Quiz): void {
    if (quiz.questions.length > 0 ) {
      this.gameForm = this.formBuilder.group({
        userId: [this.user.id],
        quizId: [quiz.id],
        question: [[quiz.questions[0]]],
        score: [quiz.questions.length]
      });
    }
  }

  addGame(): void {
    const gameToCreate = this.gameForm.getRawValue() as Game;
    this.gameService.addGame(gameToCreate);
  }

  startGame(string: string): void {
    console.log('event received from child:', string);
    this.router.navigate(['/game/' + this.user.id + '/' + string  ]);
  }

    getBold(): string{
      if(this.configuration != undefined){
           return this.configuration.bold;
      }
       return 'normal';
    }


    getPolice(): string{
      if (this.configuration != undefined){
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

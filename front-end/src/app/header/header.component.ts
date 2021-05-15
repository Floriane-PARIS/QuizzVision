import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {GameService} from '../../services/game.service';
import {Answer, Question} from "../../models/question.model";
import { Game } from 'src/models/game.model';
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";
import { Animateur } from 'src/models/animateur.model';
import { AnimateurService } from 'src/services/animateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  public user: User;
  public game: Game;
  public quiz: Quiz;
  public animateur: Animateur;

  constructor( private router: Router, public userService: UserService, public gameService: GameService, public quizService: QuizService, public animateurService: AnimateurService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
    });
    this.quizService.quizSelected$.subscribe((quiz) => {
      console.log('QUIZ', quiz);
      this.quiz = quiz;
    });
    this.animateurService.animateurSelected$.subscribe((animateur) => {
      console.log('ANIMATEUR', animateur);
      this.animateur = animateur;
    });
  }

  ngOnInit(): void {
  }

  otherUsers(): void {
    this.gameService.origin = false;
    this.userService.setSelectedUser(undefined);
    this.router.navigate(['/user-list']);
  }

  otherAnimateurs(): void {
    this.animateurService.setSelectedAnimateur(undefined);
  }

}

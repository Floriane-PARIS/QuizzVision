import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Game } from 'src/models/game.model';
import { Quiz } from 'src/models/quiz.model';
import { Resultat } from 'src/models/Resultat.model';
import { User } from 'src/models/user.model';
import { GameService } from 'src/services/game.service';
import { QuizService } from 'src/services/quiz.service';
import { UserService } from 'src/services/user.service';
import {Question} from "../../../models/question.model";
import {Configuration} from "../../../models/configuration.model";


@Component({
    selector: ' app-resultat-details',
    templateUrl: './resultat-details.component.html',
    styleUrls: ['./resultat-details.component.scss']
  })
  export class ResultatDetailsComponent implements OnInit {

    public user: User;
    public game: Game;
    public quiz: Quiz;
    public configuration: Configuration;
    public onglets = document.querySelectorAll('.onglets');
    public contenu = document.querySelectorAll('.contenu');

    constructor(public formBuilder: FormBuilder, public userService: UserService, private quizService: QuizService, private gameService: GameService, private route: ActivatedRoute) {
        this.gameService.gameSelected$.subscribe((game: Game) => {
          this.game = game;
          console.log('confii', game.configuration[0].id);
          this.configuration = game.configuration[0];
          this.gameService.getUserForGame(game);
        });
      this.gameService.gameUser$.subscribe((user: User) => {
        this.user = user;
      });
      this.quizService.quizSelected$.subscribe((quiz: Quiz) => {
        this.quiz = quiz;
      });

    }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('gameId');
      this.gameService.setSelectedGame(id);
      const quizId = this.route.snapshot.paramMap.get('quizId');
      this.quizService.setSelectedQuiz(quizId);
  }

  dateGame(gameDate: Date): Date {
      const date = new Date(gameDate);
      return date;
  }

  ongletChange(dataNumber: string): void {
    this.contenuChange('cont' + dataNumber);
    const data = 'ongl' + dataNumber;
      this.onglets = document.querySelectorAll('.onglets');
      this.onglets.forEach(onglet => {
        if (onglet.classList.contains('active')) {
          return;
        } else {
          onglet.classList.add('active');
        }
        // tslint:disable-next-line:prefer-for-of
        for (let n = 0; n < this.onglets.length; n++) {
          if (this.onglets[n].getAttribute('id') != data) {
            this.onglets[n].classList.remove('active');
          }
        }
    });
  }

  contenuChange(data: string): void {
    this.onglets = document.querySelectorAll('.contenu');
    this.onglets.forEach(onglet => {
      if (onglet.classList.contains('activeContenu')) {
        return;
      } else {
        onglet.classList.add('activeContenu');
      }
      // tslint:disable-next-line:prefer-for-of
      for (let n = 0; n < this.onglets.length; n++) {
        if (this.onglets[n].getAttribute('id') != data) {
          this.onglets[n].classList.remove('activeContenu');
        }
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/Theme.model';
import {ThemeService} from '../../../services/theme.service';
import {Quiz} from '../../../models/quiz.model';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {GameService} from "../../../services/game.service";
import {Game} from "../../../models/game.model";

@Component({
  selector: 'app-resultat-search',
  templateUrl: './resultat-search.component.html',
  styleUrls: ['./resultat-search.component.scss']
})
export class ResultatSearchComponent implements OnInit {
  public userFName: string;
  public userLName: string;
  public userHandicap: string;
  public date: Date;
  public quizName: string;
  public gameNote: number;
  public users: User[];
  public quizzes: Quiz[];
  public games: Game[];

  constructor(public quizService: QuizService, public userService: UserService, public gameService: GameService) {
    this.userService.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.quizService.quizzes$.subscribe((quizes: Quiz[]) => {
      this.quizzes = quizes;
    });
    this.gameService.games$.subscribe((games: Game[]) => {
      this.games = games;
    });
    this.userFName = '';
    this.userLName = '';
    this.userHandicap = '';
    this.date = new Date();
    this.quizName = '';
    this.gameNote = 0;
  }

  ngOnInit(): void {
  }

  searchQuizName(): void {
    const quizToSearch: string = this.quizName as string;
    this.quizService.retrieveQuizzeName(quizToSearch);
  }

  searchUserName(): void {
    const userToSearch1: string = this.userFName as string;
    const userToSearch2: string = this.userLName as string;
    this.userService.retrieveUserName(userToSearch1, userToSearch2);
  }

  searchGameNote(): void {
    const gameToSearch: number = this.gameNote as number;
    this.gameService.retrieveGameNote(gameToSearch);
  }

  allUsers(): void {
    this.userService.retrieveUsers();
    this.userFName = '';
    this.userLName = '';
    this.userHandicap = '';
  }

  annule(): void {
    this.allUsers();
    this.userService.retrieveUsers();
    this.gameService.retrieveGames();
    this.date = new Date();
    this.quizName = '';
    this.gameNote = 0;
  }
}

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
  public gameDateYear: number;
  public gameDateOperation: boolean;
  public gameDateMonth: number;
  public gameDateDay: number;
  public quizName: string;
  public gameNote: number;
  public gameNoteOperation: number;
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
    this.gameDateYear = 0;
    this.gameDateOperation = true;
    this.gameDateMonth = 0;
    this.gameDateDay = 0;
    this.quizName = '';
    this.gameNote = 0;
    this.gameNoteOperation = 0;
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

  searchUserHandicap(): void {
    const userToSearch: string = this.userHandicap as string;
    this.userService.retrieveUserTroubles(userToSearch);
  }

  searchGameNote(): void {
    const gameToSearch: number = this.gameNote as number;
    const gameToSearchOperation: number = this.gameNoteOperation as number;
    this.gameService.retrieveGameNote(gameToSearch, gameToSearchOperation);
  }

  searchGameDate(): void {
    let gameToSearchYear: number = this.gameDateYear as number;
    let gameToSearchMonth: number = this.gameDateMonth as number;
    let gameToSearchDay: number = this.gameDateDay as number;
    const gameToSearchOperation: boolean = this.gameDateOperation as boolean;
    this.gameService.retrieveGameDate(gameToSearchOperation, gameToSearchYear, gameToSearchMonth, gameToSearchDay);
  }

  allUsers(): void {
    this.userService.retrieveUsers();
    this.userFName = '';
    this.userLName = '';
    this.userHandicap = '';
  }

  allGames(): void {
    this.gameService.retrieveGames();
    this.gameNote = 0;
    this.gameDateYear = 0;
    this.gameDateMonth = 0;
    this.gameDateDay = 0;
  }

  allQuizzes(): void {
    this.quizService.retrieveQuizzes();
    this.quizName = '';
  }

  annule(): void {
    this.allUsers();
    this.allGames();
    this.allQuizzes();
  }

  dateGame(gameDate: Date): Date {
    const date = new Date(gameDate);
    return date;
  }
}

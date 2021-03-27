import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Quiz} from "../models/quiz.model";
import {Answer, Question} from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
   The list of game.
   */
  private users: Game[] = [];

  /*
   Observable which contains the list of the game.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);

  public gameSelected$: Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/games';
  private answersPath = 'answers';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveGames();
  }

  retrieveGames(): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((userList) => {
      this.users = userList;
      this.games$.next(this.users);
    });
  }

  addGame(game: Game): void {
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe(() => this.retrieveGames());
  }

  setSelectedGame(gameId: string): void {
    const urlWithId = this.gameUrl + '/' + gameId;
    this.http.get<Game>(urlWithId).subscribe((game) => {
      this.gameSelected$.next(game);
    });
  }

  deleteGame(game: Game): void {
    const urlWithId = this.gameUrl + '/' + game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => this.retrieveGames());
  }

  addAnswer(game: Game, answer: Answer): void {
    const answerUrl =  '/' + game.quizId + '/' + game.questionId + '/' + this.answersPath;
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  deleteAnswer(game: Game, answer: Answer): void {
    const answerUrl = '/' + game.quizId + '/' + game.questionId + '/' + this.answersPath;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }
}

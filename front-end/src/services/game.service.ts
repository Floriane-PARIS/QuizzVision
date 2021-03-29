import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
   The list of game.
   */
  private games: Game[] = [];

  /*
   Observable which contains the list of the game.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);

  public gameSelected$: Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/games';
  private answersPath = 'answers';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveGames();
  }

  retrieveGames(): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = gameList;
      this.games$.next(this.games);
    });
  }

  islastGame(): string {
    console.log('log:', this.games.length);
    if (this.games.length < 1) {
      return null;
    }
    return this.games[this.games.length - 1].id;
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
    const answerWrite = {answers: [answer]};
    const answerUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Answer>(answerUrl, answerWrite, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  addQuestion(game: Game, question: Question): void {
    const questionUrl = this.gameUrl + '/' + game.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  deleteAnswer(game: Game, answer: Answer): void {
    const answerUrl = '/' + game.quizId + '/' + game.question[0].id + '/' + this.answersPath;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }
}

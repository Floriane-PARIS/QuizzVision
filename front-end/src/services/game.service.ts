import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';
import {User} from "../models/user.model";
import {Configuration} from "../models/configuration.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
   The list of game.
   */
  private games: Game[] = [];
  public origin: boolean;
  // public gameQuestion: Question;  // changes
  // public gameQuiz: Quiz; // changes

  /*
   Observable which contains the list of the game.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);

  public gameSelected$: Subject<Game> = new Subject();

  // public gameQuestion$: Subject<Question> = new Subject(); // changes
  // public gameQuiz$: Subject<Quiz> = new Subject();

  public selectedGameId$: Subject<string> = new Subject();
  public gameUser$: Subject<User> = new Subject();

  private gameUrl = serverUrl + '/games';
  private quizUrl = serverUrl + '/quizzes';
  private userUrl = serverUrl + '/users';
  private answersPath = 'answers';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveGames();
    this.origin = false;
  }

  retrieveGames(isSetSelectedGame: boolean = false): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = gameList;
      this.games$.next(this.games);
      if (isSetSelectedGame){
        this.selectedGameId$.next(this.islastGame());
      }

    });
  }

  retrieveGameNote(gameNote: number, noteOperation: number): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < gameList.length; i++){
        if (((noteOperation == 0) && (gameList[i].score == gameNote))
        || ((noteOperation == 1) && (gameList[i].score >= gameNote))
        || ((noteOperation == 2) && (gameList[i].score <= gameNote))){
          this.games.push(gameList[i]);
        }
      }
      this.games$.next(this.games);
    });
  }

  retrieveGameDate(isDateEqual: boolean, dateYear: number, dateMonth: number, dateDay: number): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < gameList.length; i++){
        const date = new Date(gameList[i].date);
        if (((isDateEqual) && (this.isGameDateIsParametre(gameList[i], dateYear, dateMonth, dateDay)))
        || ((isDateEqual.toString() === 'false') && (this.isGameDateMoreThanParametre(gameList[i], dateYear, dateMonth, dateDay)))){
          this.games.push(gameList[i]);
        }
      }
      this.games$.next(this.games);
    });
  }

  isGameDateIsParametre( game: Game, dateYear: number, dateMonth: number, dateDay: number): boolean {
    const date = new Date(game.date);
    if ((date.getFullYear() == dateYear)
      && (date.getMonth() == dateMonth)
      && (date.getDay() == dateDay)) {
      return true;
    }
    return false;
  }

  isGameDateMoreThanParametre( game: Game, dateYear: number, dateMonth: number, dateDay: number): boolean {
    const date = new Date(game.date);
    if ((date.getFullYear() > dateYear)
      || (date.getMonth() > dateMonth)
      || (!(date.getFullYear() < dateYear) && !(date.getMonth() < dateMonth) && !(date.getDay() < dateDay))) {
      return true;
    }
    return false;
  }

  islastGame(): string {
    console.log('log:', this.games.length);
    if (this.games.length < 1) {
      return null;
    }
    return this.games[this.games.length - 1].id;
  }

  addGame(game: Game): void {
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe(() => this.retrieveGames(true));
  }

  setSelectedGame(gameId: string): void {
    if (gameId === undefined) {
      this.gameSelected$.next(undefined);
    } else {
      const urlWithId = this.gameUrl + '/' + gameId;
      this.http.get<Game>(urlWithId).subscribe((game) => {
        this.gameSelected$.next(game);
      });
    }
  }

  deleteGame(game: Game): void {
    const urlWithId = this.gameUrl + '/' + game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => this.retrieveGames());
  }

  addAnswer(game: Game, answer: Answer): void {
    let answerWrite;
    if (game.answers == undefined) {
      answerWrite = {answers: [answer.id]};
    }else {
      game.answers.push(answer.id);
      answerWrite = {answers: game.answers};
    }
    console.log(answerWrite);
    const answerUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(answerUrl, answerWrite, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  addQuestion(game: Game, question: Question): void {
    const questionUrl = this.gameUrl + '/' + game.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  deleteAnswer(game: Game, answer: Answer): void {
    const answerUrl = '/' + game.quizId + '/' + game.question[0].id + '/' + this.answersPath;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  /*
  // faire une méthode pour récupérer la question
  getQuestion(game: Game): void{
    const questionUrl = this.quizUrl + '/' + game.quizId + '/' + this.questionsPath + '/' + game.question[0].id;
    this.http.get<Question>(questionUrl, this.httpOptions).subscribe((gameList) => {
      this.gameQuestion = gameList;
      this.gameQuestion$.next(gameList);
      this.retrieveGames();
    });
  }*/

  nextQuestionGame(game: Game): void{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      const index = this.getIndexQuestionInQuiz(game, quiz);
      console.log(index);
      if (index >= 0 ) {
        this.updateGameQuestion(game, this.getQuestionWithIndexInQuiz(index + 1, quiz));
      }
      this.retrieveGames();
    });
  }

  /*getLengthGame(game: Game): number{
      const quizUrl = this.quizUrl + '/' + game.quizId ;
      this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
        return quiz.questions.length;
      });
      return 0;
  }*/

  updateGameQuestion(game: Game, question: Question): void {
    const questionWrite = {question: [question]};
    const questionUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(questionUrl, questionWrite, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  updateScore(game: Game): void {
    const score = {score: game.score - 1};
    const questionUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(questionUrl, score, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  // return index of Question in Quiz
  getIndexQuestionInQuiz(game: Game, quiz: Quiz): number{
    let index = 0;
    for (const question of quiz.questions) {
      if (question.id === game.question[game.question.length - 1].id) {
        return index;
      }
      index++;
    }
    return -1;
  }

  // return question of index in Quiz
  getQuestionWithIndexInQuiz(indexQuestion: number, quiz: Quiz): Question{
    let index = 0;
    for (const question of quiz.questions) {
      if (index === indexQuestion) {
        return question;
      }
      index++;
    }
    return null;
  }

  /*
  getQuiz(game: Game): void{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      this.gameQuiz = quiz;
      this.gameQuiz$.next(quiz);
    });
  }
  */

  getQuizForGame(game: Game): Quiz{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      console.log(quiz);
      return quiz;
    });
    return null;
  }

  getUserForGame(game: Game): void {
    const userUrl = this.userUrl + '/' + game.userId ;
    this.http.get<User>(userUrl, this.httpOptions).subscribe((user) => {
      this.gameUser$.next(user);
    });
  }

  updateGameConfiguration(game: Game, configuration: Configuration): void {
    console.log('confi', configuration);
    let configurationWrite;
    if (game.configuration.length === 0) {
      configurationWrite = {configuration: [configuration]};
    } else {
      game.configuration.push(configuration);
      configurationWrite = {configuration: game.configuration};
    }
    const configurationUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(configurationUrl, configurationWrite, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(undefined);
      this.retrieveGames();
    });
  }



}

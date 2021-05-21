import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';
import {User} from '../models/user.model';
import {Configuration} from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /**
   * The list of game.
   */
  private games: Game[] = [];

  /**
   * Observable which contains the list of the game.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);
  public gameSelected$: Subject<Game> = new Subject();
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
  }

  /**
   * retrieve all games from back-end
   * @param isSetSelectedGame
   */
  retrieveGames(isSetSelectedGame: boolean = false): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = gameList;
      this.games$.next(this.games);
      if (isSetSelectedGame){
        this.selectedGameId$.next(this.islastGame());
      }

    });
  }

  /**
   * retrieve all games with option about notes
   * @param gameNote
   * @param noteOperation
   */
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

  /**
   * retrieve all games with option about dates
   * @param isDateEqual
   * @param dateYear
   * @param dateMonth
   * @param dateDay
   */
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

  /**
   * is the game, in the paramter, has been played at the time described by the other parameter ?
   * @param game
   * @param dateYear
   * @param dateMonth
   * @param dateDay
   */
  private isGameDateIsParametre( game: Game, dateYear: number, dateMonth: number, dateDay: number): boolean {
    const date = new Date(game.date);
    if ((date.getFullYear() == dateYear)
      && (date.getMonth() == dateMonth)
      && (date.getDay() == dateDay)) {
      return true;
    }
    return false;
  }

  /**
   * is the game, in the paramter, has been played after the time described by the other parameter ?
   * @param game
   * @param dateYear
   * @param dateMonth
   * @param dateDay
   */
  private isGameDateMoreThanParametre( game: Game, dateYear: number, dateMonth: number, dateDay: number): boolean {
    const date = new Date(game.date);
    if ((date.getFullYear() > dateYear)
      || (date.getMonth() > dateMonth)
      || (!(date.getFullYear() < dateYear) && !(date.getMonth() < dateMonth) && !(date.getDay() < dateDay))) {
      return true;
    }
    return false;
  }

  /**
   * return the id of the last game of the games' list
   */
  private islastGame(): string {
    console.log('log:', this.games.length);
    if (this.games.length < 1) {
      return null;
    }
    return this.games[this.games.length - 1].id;
  }

  /**
   * add a game in the back-end
   * @param game
   */
  addGame(game: Game): void {
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe(() => this.retrieveGames(true));
  }

  /**
   * select the game that we want to observe
   * @param gameId
   */
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

  /**
   * delete game in the back-end
   * @param game
   */
  deleteGame(game: Game): void {
    const urlWithId = this.gameUrl + '/' + game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => this.retrieveGames());
  }

  /**
   * add answer to game in the back-end
   * @param game
   * @param answer
   */
  addAnswer(game: Game, answer: Answer): void {
    let answerWrite;
    if (game.answers == undefined) {
      answerWrite = {answers: [answer.id]};
    }else {
      game.answers.push(answer.id);
      answerWrite = {answers: game.answers};
    }
    const answerUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(answerUrl, answerWrite, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  /**
   * add question to game in the back-end
   * @param game
   * @param question
   */
  addQuestion(game: Game, question: Question): void {
    const questionUrl = this.gameUrl + '/' + game.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  /**
   * search the next question of the quiz and change game's current question by it
   * @param game
   */
  nextQuestionGame(game: Game): void{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      const index = this.getIndexQuestionInQuiz(game, quiz);
      if (index >= 0 ) {
        this.updateGameQuestion(game, this.getQuestionWithIndexInQuiz(index + 1, quiz));
      }
      this.retrieveGames();
    });
  }

  /**
   * update the current question of game in the back-end
   * @param game
   * @param question
   */
  updateGameQuestion(game: Game, question: Question): void {
    const questionWrite = {question: [question]};
    const questionUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(questionUrl, questionWrite, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  /**
   * update score of game in the back-end
   * @param game
   */
  updateScore(game: Game): void {
    const score = {score: game.score - 1};
    const questionUrl = this.gameUrl + '/' + game.id ;
    this.http.put<Game>(questionUrl, score, this.httpOptions).subscribe((game: Game) => {
      this.gameSelected$.next(game);
      this.retrieveGames();
    });
  }

  /**
   * return index of question in quiz
   * @param game
   * @param quiz
   */
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

  /**
   * return the question with the index indexQuestion in quiz
   * @param indexQuestion
   * @param quiz
   */
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

  /**
   * return the Quiz which is played in game
   * @param game
   */
  getQuizForGame(game: Game): Quiz{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      return quiz;
    });
    return null;
  }

  /**
   * select the user of the game that we want to observe
   * @param game
   */
  getUserForGame(game: Game): void {
    const userUrl = this.userUrl + '/' + game.userId ;
    this.http.get<User>(userUrl, this.httpOptions).subscribe((user) => {
      this.gameUser$.next(user);
    });
  }

  /**
   * update the configuration of the game in the back-end
   * @param game
   * @param configuration
   */
  updateGameConfiguration(game: Game, configuration: Configuration): void {
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

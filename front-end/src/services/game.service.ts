import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
   The list of game.
   */
  private games: Game[] = [];
  public gameQuestion: Question;  // changes
  public gameQuiz: Quiz; // changes

  /*
   Observable which contains the list of the game.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);

  public gameSelected$: Subject<Game> = new Subject();

  public gameQuestion$: Subject<Question> = new Subject(); // changes
  public gameQuiz$: Subject<Quiz> = new Subject();

  public selectedGameId$: Subject<string> = new Subject();

  // public gameQuestion$: Subject<Question> = new Subject(); // changes
  public gameQuestionId$: Subject<string> = new Subject();  // changes

  private gameUrl = serverUrl + '/games';
  private quizUrl = serverUrl + '/quizzes';
  private answersPath = 'answers';
  private questionsPath = 'questions';
  private quizzesPath = 'quizzes'; // changes

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    //this.getQuestion(this.games[this.games.length -1 ]); //changes
    this.retrieveGames();
  }

  retrieveGames(isSetSelectedGame: boolean = false): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = gameList;
      this.games$.next(this.games);
      if (isSetSelectedGame){
        // this.setSelectedGame(this.islastGame());
        this.selectedGameId$.next(this.islastGame());
      }

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
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe(() => this.retrieveGames(true));
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
    // tslint:disable-next-line:no-shadowed-variable
    this.http.put<Game>(answerUrl, answerWrite, this.httpOptions).subscribe((game: Game) => this.gameSelected$.next(game));
  }

  addQuestion(game: Game, question: Question): void {
    const questionUrl = this.gameUrl + '/' + game.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }

  deleteAnswer(game: Game, answer: Answer): void {
    const answerUrl = '/' + game.quizId + '/' + game.question[0].id + '/' + this.answersPath;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedGame(game.id));
  }
  // faire une méthode pour récupérer la question
  getQuestion(game: Game): void{
    //const gameUrl = this.gameUrl + '/' + game.id ;
    const questionUrl = this.quizUrl + '/' + game.quizId + '/' + this.questionsPath + '/' + game.question[0].id;
    this.http.get<Question>(questionUrl, this.httpOptions).subscribe((gameList) => {
      this.gameQuestion = gameList;
      this.gameQuestion$.next(gameList);
      
    });
  }
 /* //faire une méthode pour récupérer l'id de la question actuelle du game
  getQuestionId(game: Game): string {
    this.getQuestion(game);
    return this.gameQuestion.id;
  }*/

  // récupérer le quiz correspondant au jeu"
  getQuiz(game: Game): void{
    const quizUrl = this.quizUrl + '/' + game.quizId ;
    this.http.get<Quiz>(quizUrl, this.httpOptions).subscribe((quiz) => {
      this.gameQuiz = quiz;
      this.gameQuiz$.next(quiz);;

    });
  }
  // faire une méthode pour update l'id de la question
  nextQuestion(game: Game): void {
    this.getQuestion(game);
    console.log(this.gameQuestion);
    this.getQuiz(game);
    console.log(this.gameQuiz);
    const ind = this.gameQuiz.questions.indexOf(this.gameQuestion , 0);
    console.log(ind);
    const indexNext = ind + 2 ;
    console.log(indexNext);
    if(this.gameQuiz.questions.length > indexNext){
    const nextQuestionId = this.gameQuiz.questions[indexNext].id; //this.gameUrl + '/'+
    console.log(nextQuestionId);
    const questionUrl = this.quizUrl + '/' + this.gameQuiz.id + '/' + this.questionsPath + '/' +nextQuestionId ;
    this.http.get<Question>(questionUrl, this.httpOptions).subscribe((question) => {
      console.log(this.gameQuestion);
      this.gameQuestion = question;

      this.gameQuestion$.next(question);
    });
    this.http.put<Game>(this.gameUrl + '/' + game.id, nextQuestionId, this.httpOptions).subscribe((game: Game) => this.gameSelected$.next(game));
    //this.changeQuestion(game, this.gameQuiz.questions[indexNext]);
    }
  }



}

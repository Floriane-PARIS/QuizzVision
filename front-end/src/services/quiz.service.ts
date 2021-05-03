import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Game} from '../models/game.model';
import {Theme} from "../models/Theme.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  public questionNext$: Subject<Question> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private answersPath = 'answers';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  retrieveQuizzeName2(quizName: string): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (quizList[i].name == quizName){
          this.quizzes.push(quizList[i]);
        }
      }
      this.quizzes$.next(this.quizzes);
    });
  }

  retrieveQuizzeName(quizName: string): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (quizList[i].name.includes(quizName)){
          this.quizzes.push(quizList[i]);
        }
      }
      this.quizzes$.next(this.quizzes);
    });
  }

  retrieveQuizzeTheme(quizTheme: string): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (quizList[i].theme == quizTheme){
          this.quizzes.push(quizList[i]);
        }
      }
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(quizId: string): void {
    if (quizId === undefined) {
      // this.currentUser = undefined;
      this.quizSelected$.next(undefined);
    } else {
      const urlWithId = this.quizUrl + '/' + quizId;
      this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
        this.quizSelected$.next(quiz);
      });
    }
  }

  nextQuestion(quiz: Quiz, question: Question): void{
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.get<Question>(questionUrl).subscribe((questionNext) => {
      this.questionNext$.next(questionNext);
    });
  }

  getQuestion(quizId: string, questionId: string): void{
    const questionUrl = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.get<Question>(questionUrl).subscribe((questionNext) => {
      this.questionNext$.next(questionNext);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  putQuestion(quiz: Quiz, question: Question): void {
    const questionWrite = {label : question.label };
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.put<Question>(questionUrl, questionWrite, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    for (const answer of question.answers) {
      this.putAnswer(quiz, question, answer);
    }
  }

  putAnswer(quiz: Quiz, question: Question, answer: Answer): void {
    const answerWrite = {value: answer.value, isCorrect: answer.isCorrect};
    // tslint:disable-next-line:max-line-length
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answer.id;
    this.http.put<Answer>(answerUrl, answerWrite, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteAnswer(quiz: Quiz, questionId: string, answer: Answer): void {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId + '/' + this.answersPath + '/' + answer.id;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addAnswer(quiz: Quiz, questionId: string, answer: Answer): void {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId + '/' + this.answersPath ;
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  renameQuiz(quiz: Quiz, newNameQuiz: string): void {
    const newName = {name: newNameQuiz, id: quiz.id};
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.put<Quiz>(urlWithId, newName, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  // recuperer l'id de la question
  getQuestionIdQuiz(quiz: Quiz, index: number): string {
    return quiz.questions[index].id;
  }
 // valideQuestion(quiz: Quiz, question: Question): void {
   /* to do*/
 // }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}

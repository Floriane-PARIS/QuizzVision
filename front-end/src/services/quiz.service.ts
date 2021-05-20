import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;
  public origin: boolean;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
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
    this.origin = false;
  }

  /**
   * retrieve all quizzes from the back-end
   */
  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  /**
   * retrieve all quizzes with option about name
   * @param quizName
   */
  retrieveQuizzeName(quizName: string): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++){
        // tslint:disable-next-line:triple-equals
        if ((quizList[i].name == quizName) || (quizList[i].name.includes(quizName))){
          this.quizzes.push(quizList[i]);
        }
      }
      this.quizzes$.next(this.quizzes);
    });
  }

  /**
   * retrieve all quizzes with option about theme
   * @param quizTheme
   */
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

  /**
   * add quiz in the back-end
   * @param quiz
   */
  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  /**
   * select quiz that we want to observe
   * @param quizId
   */
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

  /**
   * select the nex question of the quiz that we want to observe
   * @param quiz
   * @param question
   */
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

  /**
   * delete quiz in the back-end
   * @param quiz
   */
  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  /**
   * add question in the quiz in the back-end
   * @param quiz
   * @param question
   */
  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * delete question of the quiz in the back-end
   * @param quiz
   * @param question
   */
  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * update question in the back-end
   * @param quiz
   * @param question
   */
  putQuestion(quiz: Quiz, question: Question): void {
    const questionWrite = {label : question.label };
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.put<Question>(questionUrl, questionWrite, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quiz.id);
      for (const answer of question.answers) {
        this.putAnswer(quiz, question, answer);
      }
    });
  }

  /**
   * update answer in the back-end
   * @param quiz
   * @param question
   * @param answer
   */
  putAnswer(quiz: Quiz, question: Question, answer: Answer): void {
    const answerWrite = {value: answer.value, isCorrect: answer.isCorrect};
    // tslint:disable-next-line:max-line-length
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answer.id;
    this.http.put<Answer>(answerUrl, answerWrite, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * delete answer in the back-end
   * @param quiz
   * @param questionId
   * @param answer
   */
  deleteAnswer(quiz: Quiz, questionId: string, answer: Answer): void {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId + '/' + this.answersPath + '/' + answer.id;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * add answre in the back-end
   * @param quiz
   * @param questionId
   * @param answer
   */
  addAnswer(quiz: Quiz, questionId: string, answer: Answer): void {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId + '/' + this.answersPath ;
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * update the quiz' name
   * @param quiz
   * @param newNameQuiz
   */
  renameQuiz(quiz: Quiz, newNameQuiz: string): void {
    const newName = {name: newNameQuiz};
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.put<Quiz>(urlWithId, newName, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  /**
   * update the quiz' theme
   * @param quiz
   * @param newTheme
   */
  changeQuizTheme(quiz: Quiz, newTheme: string): void {
    const newName = {theme: newTheme};
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.put<Quiz>(urlWithId, newName, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }
}

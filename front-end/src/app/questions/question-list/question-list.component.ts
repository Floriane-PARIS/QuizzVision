import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {Answer, Question} from 'src/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;
  public editQuestionChose: string;

  constructor(private quizService: QuizService) {
    this.editQuestionChose = '';
  }

  ngOnInit(): void {
  }

  deleteQuestion(question: Question): void {
    this.quizService.deleteQuestion(this.quiz, question);
  }

  deleteAnswer(answer: Answer): void {
    this.quizService.deleteAnswer(this.quiz, this.editQuestionChose,  answer);
  }

  nextQuestion(question: Question): void {
    this.quizService.nextQuestion(this.quiz, question);
    console.log(question);
  }

  editQuestion(question: Question): void {
    this.editQuestionChose = question.id;
  }

  editQuestionDone(question: Question): void {
    this.quizService.putQuestion(this.quiz, question);
    this.editQuestionChose = '';
  }

  editAnswerDone(answer: Answer): void {
    this.quizService.addAnswer(this.quiz, this.editQuestionChose, answer);
  }

}

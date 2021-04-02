import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';

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

  nextQuestion(question: Question): void {
    this.quizService.nextQuestion(this.quiz, question);
    console.log(question);
  }

  editQuestion(question: Question): void {
    this.editQuestionChose = question.id;
    console.log(this.editQuestionChose);
  }

  editQuestionDone(question: Question): void {
    this.editQuestionChose = '';
    console.log(this.editQuestionChose);
  }

}

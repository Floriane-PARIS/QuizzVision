import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();
  constructor() { }

  ngOnInit(): void {
  }

  valideAnswer(): void {
    this.deleteQuestion.emit(this.question);
  }

  valideQuestion(): void {
    this.deleteQuestion.emit(this.question);
  }

  nextquestion(): void {
    this.nextQuestion.emit(this.question);
  }

}

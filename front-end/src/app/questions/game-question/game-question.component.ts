import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

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
  valideQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  valideAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();
  constructor() { }

  ngOnInit(): void {
  }

  choseAnswer(answer: Answer): void {
    this.valideAnswer.emit(answer);
  }

  valideQuestionAnswered(): void {
    this.valideQuestion.emit(this.question);
  }

  nextquestion(): void {
    this.nextQuestion.emit(this.question);
  }

}

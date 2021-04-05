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
  @Input()
  isValided: boolean;

  @Output()
  valideQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  valideAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() { }

  ngOnInit(): void {
  }

  choseAnswer(answer: Answer): void {
    this.valideAnswer.emit(answer);
  }

  valideQuestionAnswered(): void {
    this.valideQuestion.emit(this.question);
  }

}

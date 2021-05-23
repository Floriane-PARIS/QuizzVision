import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer, Question } from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  //public question: Answer[] = [];
  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  editQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  nextQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() {
  }

  ngOnInit(): void {
  }

  delete(): void {
        if(confirm('Etes-vous sûr de vouloir supprimer cette question ?')) {
          this.deleteQuestion.emit(this.question);
        }
  }

  edit(): void {
    this.editQuestion.emit(this.question);
  }
}


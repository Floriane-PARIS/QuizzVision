import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  editQuestionDone: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() {
  }

  ngOnInit(): void {
  }

  edit(): void {
    this.editQuestionDone.emit(this.question);
  }

}

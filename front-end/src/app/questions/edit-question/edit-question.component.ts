import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import {Answer, Question} from 'src/models/question.model';
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

  @Output()
  deleteAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();
  @Output()
  editAnswerDone: EventEmitter<Answer> = new EventEmitter<Answer>();

  answers: FormArray;
  public answerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.answers = this.formBuilder.array([]);
    this.answerForm = null;
  }

  ngOnInit(): void {
  }

  edit(): void {
    if (this.answerForm != null){
    if (this.answerForm.valid) {
      const answer = this.answerForm.getRawValue() as Answer;
      this.editAnswerDone.emit(answer);
    }
     }
    this.editQuestionDone.emit(this.question);
  }

  delete(answer: Answer): void {
    this.deleteAnswer.emit(answer);
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  private createAnswer(): FormGroup {
    this.answerForm = this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
    return this.answerForm;
  }




}

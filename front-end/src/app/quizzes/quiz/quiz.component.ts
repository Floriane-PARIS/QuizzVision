import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  public user: User;

  constructor( public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  selectQuiz(): void {
    this.quizSelected.emit(this.quiz);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }
}

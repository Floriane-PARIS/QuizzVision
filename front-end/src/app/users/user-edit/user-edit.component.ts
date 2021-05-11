import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import {Answer, Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


  @Input()
  user: User;

  @Output()
  editUserDone: EventEmitter<User> = new EventEmitter<User>();

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
  }

  edit(): void {
    this.editUserDone.emit(this.user);
  }

  retour(): void{
    location.reload();
  }
}


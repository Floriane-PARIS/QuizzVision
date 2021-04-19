import { Component, OnInit, Input} from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  user: User;
  public editUserChose: string;


  public userList: User[] = [];

  constructor(private router: Router, private userService: UserService, private quizService: QuizService) {
    this.editUserChose = '';
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  ngOnInit(): void {
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  selectUser(user: User): void {
    this.quizService.setSelectedQuiz(undefined);
    this.userService.setSelectedUser(user.id);
    this.userService.retrieveUsers();
    console.log('event received from child:', user.id);
    this.router.navigate(['/quiz-list/' + user.id]);
  }

  editUser(user: User): void {
    console.log('edit');
    this.editUserChose = user.id;
  }

  editUserDone(user: User): void {
    this.userService.updateUser(user);
    this.editUserChose = '';
  }
  ajoutPatient(): void{
    console.log('event received from child: new user');
    this.router.navigate(['/user-form']);
  }

}

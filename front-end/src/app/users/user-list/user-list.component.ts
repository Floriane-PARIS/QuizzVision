import { Component, OnInit, Input} from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";
import {Question} from "../../../models/question.model";

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

  constructor(private router: Router, private userService: UserService) {
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

}

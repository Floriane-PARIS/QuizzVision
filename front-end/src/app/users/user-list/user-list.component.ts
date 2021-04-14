import { Component, OnInit, Input} from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {Quiz} from "../../../models/quiz.model";
import {Router} from "@angular/router";

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

  //changes
 /* editUser(user: User): void {
    console.log('event received from child:', user.firstName);
    this.router.navigate(['/edit-quiz/' + user.firstName]);
  }*/ // a éditer***


}

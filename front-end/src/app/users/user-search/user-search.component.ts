import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  public userFName: string;
  public userTroubles: string;
  public userLName: string;
  public users: User[];

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.userFName = '';
    this.userTroubles = '';
    this.userLName = '';
  }

  ngOnInit(): void {
  }

  searchUserName(): void {
    const userToSearch1: string = this.userFName as string;
    const userToSearch2: string = this.userLName as string;
    this.userService.retrieveUserName(userToSearch1, userToSearch2);
  }
  annule(): void {
    this.userService.retrieveUsers();
  }

  searchUserTroubles(): void {
    const troubleToSearch: string = this.userTroubles as string;
    this.userService.retrieveUserTroubles(troubleToSearch);
  }
}

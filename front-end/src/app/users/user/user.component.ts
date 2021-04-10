import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected:EventEmitter<User> = new EventEmitter<User>();
  deleteUser: EventEmitter<User> = new EventEmitter<User>();
  userEdit: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  selectUser(): void {
    this.userSelected.emit(this.user);
  }

  delete() {
    this.deleteUser.emit(this.user);
  }

  edit(): void {
    this.userEdit.emit(this.user);
  }


}

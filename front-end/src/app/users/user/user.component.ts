import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  editUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

  select(): void {
    this.userSelected.emit(this.user);
  }

  edit(): void {
    this.editUser.emit(this.user);
  }

  delete(): void {
    this.deleteUser.emit(this.user);
  }

  hasConfiguration(): Boolean{
    if(this.userService.getConfiguration(this.user.id) == undefined){
      return true;
    }
    return false;
  }
}


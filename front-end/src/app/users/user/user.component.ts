import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {GameService} from '../../../services/game.service';

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

  constructor(public userService: UserService, public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  select(): void {
    this.userSelected.emit(this.user);
    this.userService.setSelectedUser(this.user.id);
  }

  edit(): void {
    this.editUser.emit(this.user);
  }

  delete(): void {
        if(confirm('Etes-vous sûr de vouloir supprimer le patient '+ this.user.firstName+' ?')) {
          this.deleteUser.emit(this.user);
        }
  }

}


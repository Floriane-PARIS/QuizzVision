import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

 /* public user: User;
  public userName: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
    console.log(this.user);
    this.userName = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  modifUserComments(): void {
    console.log("on a enregistré les modifications");
    const userToSearch: string = this.userName as string;
    this.userService.retrieveUserName(userToSearch);
  }*/

  
  public user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userService.userSelected$.subscribe((users) => this.user = users);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
}

}



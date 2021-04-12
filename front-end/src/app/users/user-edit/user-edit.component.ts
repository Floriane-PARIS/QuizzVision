import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: User;
  public comments: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
    this.comments = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  modifUserComments(): void {
    const commentsToSearch: string = this.comments as string;
    this.userService.retrieveUserComments(commentsToSearch);
  }
}

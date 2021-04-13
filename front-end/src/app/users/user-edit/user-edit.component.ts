import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public userComments: string;
  public userForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, public formBuilder: FormBuilder) {
    this.userService.userSelected$.subscribe((user) => {this.user = user;
      console.log("user " + this.user);});

    this.userComments = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  modifUserComments(): void {
    console.log("userComments:" + this.userComments);
    console.log("user.comm " + this.user.commentaires);
    this.userService.updateUserComments(this.user, this.userComments);

  }

  /*edit(): void {
    if (this.userForm != null){
    if (this.userForm.valid) {
      const answer = this.userForm.getRawValue() as User;
      this.userEditDone.emit(answer);
    }
     }
    this.userEditDone.emit(this.user);
  }*/
}


import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    @Input()
    user: User;
  
    @Output()
    userEditDone: EventEmitter<User> = new EventEmitter<User>();
  

 // public user: User;
  public comments: string;
  public userForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, public formBuilder: FormBuilder) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
    this.comments = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  modifUserComments(): void {
    const commentsToSearch: string = this.comments as string;
    this.userService.updateUserComments(this.user, commentsToSearch);
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


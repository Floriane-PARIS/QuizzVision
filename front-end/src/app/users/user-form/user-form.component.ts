import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router,) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      encadreur: [''],
      maladies: [''],
      commentaires:[''],
      age : [''],
    });
  }

  ngOnInit(): void {
  }

  addUser(): void {
    // We retrieve here the user object from the userForm and we cast the type "as User".
    const userToCreate: User = this.userForm.getRawValue() as User;
    this.userService.addUser(userToCreate);
    this.router.navigate(['/user-list']);
  }

  annule(): void {
    this.router.navigate(['/user-list']);
  }
}

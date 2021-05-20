import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import {AnimateurService} from '../../../services/animateur.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  public animateurId: string;

  constructor(public formBuilder: FormBuilder,  private route: ActivatedRoute, public userService: UserService, public animateurService: AnimateurService, private router: Router,) {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      encadreur: ['Pierre'],
      maladies: [''],
      commentaires:[''],
      age : [''],
      sexe: [''],
    });
  }

  ngOnInit(): void {
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  addUser(): void {
    // We retrieve here the user object from the userForm and we cast the type "as User".
    const userToCreate: User = this.userForm.getRawValue() as User;
    this.userService.addUser(userToCreate);
    this.router.navigate(['/' + this.animateurId + '/user-list']);
  }

  annule(): void {
    this.router.navigate(['/' + this.animateurId + '/user-list']);
  }

  Homme(): void {
    const userToCreate: User = this.userForm.getRawValue() as User;
    userToCreate.sexe = "Homme";
    this.userService.updateUser(userToCreate);
  }

  Femme(): void {
    const userToCreate: User = this.userForm.getRawValue() as User;
    userToCreate.sexe = "Femme";
    this.userService.updateUser(userToCreate);
  }
}

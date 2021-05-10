import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss']
  })
  export class InscriptionComponent implements OnInit {

    public user: User;
    public connexionForm: FormGroup;

    constructor(private router: Router,public userService: UserService,public formBuilder: FormBuilder){
        this.connexionForm = this.formBuilder.group({
            name: [''],
            password: [''],
          });
          
        this.userService.userSelected$.subscribe((user) => {
            this.user = user;
        });
    }
    
    
    ngOnInit(): void {
    }

    connexion(): void {
        this.userService.setSelectedUser(undefined);
        this.router.navigate(['/connexion-form']);
      }

  }
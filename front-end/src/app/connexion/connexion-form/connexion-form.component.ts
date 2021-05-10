import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-connexion-form',
    templateUrl: './connexion-form.component.html',
    styleUrls: ['./connexion-form.component.scss']
  })
  export class ConnexionFormComponent implements OnInit {

    public user: User;

    public connexionForm: FormGroup;

    constructor(private router: Router,public userService: UserService, public formBuilder: FormBuilder){
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
    otherUsers(): void {
        this.userService.setSelectedUser(undefined);
        this.router.navigate(['/user-list']);
      }

  }
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Animateur } from "src/models/animateur.model";
import { Inscription } from "src/models/inscription.model";
import { User } from "src/models/user.model";
import { AnimateurService } from "src/services/animateur.service";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-connexion-form',
    templateUrl: './connexion-form.component.html',
    styleUrls: ['./connexion-form.component.scss']
  })
  export class ConnexionFormComponent implements OnInit {

    public user: User;
    public animateur: Animateur;
    public inscription: Inscription;
    public connexionForm: FormGroup;
    public animateurForm: FormGroup;
    public name: string;
    public password: string;
  
    constructor(private router: Router,public userService: UserService,public animateurService: AnimateurService, public formBuilder: FormBuilder){
        this.name ='';
        this.password= '';

        this.userService.userSelected$.subscribe((user) => {
            this.user = user;
        });

        this.animateurService.animateurSelected$.subscribe((animateur) => {
          console.log('ANIMATEUR', animateur);
          this.animateur = animateur;
        });

        this.animateurForm = this.formBuilder.group({
          name: [''],
          password: [''], 
      });
        
    }
    
    ngOnInit(): void {
    }
    ajoutAnimateur(): void {
        if(this.checkData()){
          console.log('event received from child: new animateur');
           this.router.navigate(['/user-list']);
        }
        else{
          console.log('Name incorrect or password incorrect');  
        }
    }
    checkData(): boolean{
      if(this.inscription.name == this.name && this.inscription.password == this.password){
        return true;
      }
      else{
        return false;
      }
    }

  }
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Animateur } from "src/models/animateur.model";
//import { User } from "src/models/user.model";
import { AnimateurService } from "src/services/animateur.service";
//import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-animateur-inscription',
    templateUrl: './animateur-inscription.component.html',
    styleUrls: ['./animateur-inscription.component.scss']
  })
  export class InscriptionComponent implements OnInit {

   // public animateurForm: FormGroup;
    public inscriptionForm: FormGroup;
  /*  public users: User[];
    public animateur: Animateur;
    public name: string;
    public mail: string;
    public password: string;
    public passwordConfirmed: string;*/

    constructor(private router: Router, public formBuilder: FormBuilder, public animateurService: AnimateurService){
       /* this.animateurForm = this.formBuilder.group({
            name: [''],
            password: [''], 
        });*/

        this.inscriptionForm = this.formBuilder.group({
          name: [''],
          mail: [''],
          password: [''],
          passwordConfirmed: [''],
      });

       /* this.name = '';
        this.mail = '';
        this.password = '';
        this.passwordConfirmed = '';

        this.userService.users$.subscribe((users: User[]) => {
          this.users = users;
        });
        this.animateurService.animateurSelected$.subscribe((animateur) => {
          console.log('ANIMATEUR', animateur);
          this.animateur = animateur;
        });*/
        
    }
    
    ngOnInit(): void {
    }

    ajoutAnimateur(): void {
          const animateurToCreate: Animateur = this.inscriptionForm.getRawValue() as Animateur;
          this.animateurService.addAnimateur(animateurToCreate);
          this.router.navigate(['/animateur-connexion']);
          console.log("ajouter");
        
    }

    
  annule(): void {
    this.router.navigate(['/animateur-connexion']);
  }
}


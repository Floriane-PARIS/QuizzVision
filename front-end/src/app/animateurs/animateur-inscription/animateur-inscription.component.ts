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

    public inscriptionForm: FormGroup;
    public passWordConfirmed: string;
    public messageError: string;

    constructor(private router: Router, public formBuilder: FormBuilder, public animateurService: AnimateurService){
      this.messageError = '';
      this.inscriptionForm = this.formBuilder.group({
          name: [''],
          mail: [''],
          password: [''],
      });

    }

    ngOnInit(): void {
    }

    isNoError(): boolean {
      if (this.inscriptionForm.value.name.length <= 0) {
        this.messageError = "vous n'avez pas saisi votre Nom";
        return false;
      } else if (this.inscriptionForm.value.mail.length <= 0) {
        this.messageError = "vous n'avez pas saisi votre Mail";
        return false;
      } else if (!this.inscriptionForm.value.mail.includes('@')) {
        this.messageError = "vous avez mal saisi votre Mail. Il manque @";
        return false;
      } else if (this.inscriptionForm.value.password.length <= 0) {
        this.messageError = "vous n'avez pas saisi votre Mot de Passe";
        return false;
      } else if (this.inscriptionForm.value.password != this.passWordConfirmed) {
        this.messageError = "erreur de Confirmation de Mot de Passe";
        return false;
      }
      return true;
    }

    ajoutAnimateur(): void {
      if (this.isNoError()) {
        const animateurToCreate: Animateur = this.inscriptionForm.getRawValue() as Animateur;
        this.animateurService.addAnimateur(animateurToCreate);
        this.router.navigate(['/animateur-connexion']);
        console.log("ajouter");
      }
    }


  annule(): void {
    this.router.navigate(['/animateur-connexion']);
  }
}


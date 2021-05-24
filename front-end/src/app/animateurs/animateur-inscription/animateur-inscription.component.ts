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
    public isActive: boolean;
    public isActiveConfirmed: boolean;
    public animateurs: Animateur[];

    constructor(private router: Router, public formBuilder: FormBuilder, public animateurService: AnimateurService){
      this.messageError = '';
      this.isActive = false;
      this.isActiveConfirmed = false;
      this.inscriptionForm = this.formBuilder.group({
          name: [''],
          mail: [''],
          password: [''],
      });
      this.animateurService.animateurs$.subscribe((animateurs: Animateur[]) => {
        this.animateurs = animateurs;
      });


    }

    ngOnInit(): void {
    }

    isActived(valide: boolean): void {
      this.isActive = valide;
    }

    isActivedConfirmed(valide: boolean): void {
      this.isActiveConfirmed = valide;
    }

    isNameAlreadyTaken(): boolean {
      let already = false;
      this.animateurs.forEach(element => {
        if (element.name == this.inscriptionForm.value.name) {
          already = true;
        }
      });
      return already;
    }

    isNoError(): boolean {
      if (this.inscriptionForm.value.name.length <= 0) {
        this.messageError = "vous n'avez pas saisi votre Nom";
        return false;
      } else if (this.isNameAlreadyTaken()) {
        this.messageError = "Cet identifient est déjà utilisé";
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
        console.log(animateurToCreate);
        this.animateurService.addAnimateur(animateurToCreate);
        this.router.navigate(['/animateur-connexion']);
        console.log("ajouter");
      }
    }


  annule(): void {
    this.router.navigate(['/animateur-connexion']);
  }
}


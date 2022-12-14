import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Animateur } from "src/models/animateur.model";
import { User } from "src/models/user.model";
import { AnimateurService } from "src/services/animateur.service";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-animateur-connexion',
    templateUrl: './animateur-connexion.component.html',
    styleUrls: ['./animateur-connexion.component.scss']
  })
  export class ConnexionFormComponent implements OnInit {

    public user: User;
    public animateurs: Animateur[];
    public animateur: Animateur;
    public connexionForm: FormGroup;
    public name: string;
    public password: string;
    public messageError: string;
    public isActive: boolean;

    constructor(private router: Router,public userService: UserService,public animateurService: AnimateurService, public formBuilder: FormBuilder){
        /*this.name ='';
        this.password= '';

        this.userService.userSelected$.subscribe((user) => {
            this.user = user;
        });

        this.animateurService.animateurSelected$.subscribe((animateur) => {
          console.log('ANIMATEUR', animateur);
          this.animateur = animateur;
        });*/
      this.messageError = '';
      this.isActive = false;
        this.animateurService.animateurs$.subscribe((animateurs: Animateur[]) => {
          this.animateurs = animateurs;
        });

        this.connexionForm = this.formBuilder.group({
          name: [''],
          password: [''],
      });

    }

    ngOnInit(): void {
    }

  isActived(valide: boolean): void {
    this.isActive = valide;
  }

    checkData(): void{

      const tempAnimateur = this.connexionForm.getRawValue() as Animateur;
      console.log(tempAnimateur);
      console.log(this.animateurs);
      this.animateurs.forEach( animateur => {
        console.log(animateur.name + ' ' + animateur.password);
        if(animateur.name == tempAnimateur.name && animateur.password == tempAnimateur.password){
          console.log(true);
          this.animateur = animateur;
          this.selectAdmin(animateur);
          return;
        }
      });
      this.messageError = "erreur sur le NOM ou sur le MOT DE PASSE";
      return

    }

    selectAdmin(animateur: Animateur): void {
      this.userService.setSelectedUser(undefined);
      this.animateurService.setSelectedAnimateur(animateur.id);
      // this.animateurService.retrieveAnimateurs();
      console.log('event received from child:', animateur.id);
      this.router.navigate(['/' +  animateur.id + '/quiz-list']);
    }

  }

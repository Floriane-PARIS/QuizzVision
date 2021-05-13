import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Animateur } from "src/models/animateur.model";
import { Inscription } from "src/models/inscription.model";
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
        this.animateurService.animateurs$.subscribe((animateurs: Animateur[]) => {
          this.animateurs = animateurs;
        });

        this.connexionForm = this.formBuilder.group({
          name: [''],
          password: [''], 
          mail:[''],
          passwordConfirmed: [''],
      });
        
    }
    
    ngOnInit(): void {
    }
   
    checkData(): void{
     
      const tempAnimateur = this.connexionForm.getRawValue() as Animateur;
      console.log(tempAnimateur);
      this.animateurService.retrieveAnimateurs();
      console.log(this.animateurs);
      this.animateurs.forEach( animateur => {
        if(animateur.name == tempAnimateur.name && animateur.password == tempAnimateur.password){
          console.log(true);
          this.animateur = animateur;
          this.selectAdmin(animateur);
        }
      });
     // console.log("erreur sur nom ou mot de passe");
     //Pascal Nug Tsamo
    
     
      /*if(this.inscription.name == this.name && this.inscription.password == this.password){
        return true;
      }
      else{
        return false;
      }*/
    }

    selectAdmin(animateur: Animateur): void {
      this.userService.setSelectedUser(undefined);
      this.animateurService.setSelectedAnimateur(animateur.id);
      this.animateurService.retrieveAnimateurs();
      console.log('event received from child:', animateur.id);
      this.router.navigate(['/user-list/' + animateur.id]);
    }

  }
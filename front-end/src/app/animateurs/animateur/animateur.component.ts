import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Animateur } from "src/models/animateur.model";
import { User } from "src/models/user.model";
import { AnimateurService } from "src/services/animateur.service";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-animateur',
    templateUrl: './animateur.component.html',
    styleUrls: ['./animateur.component.scss']
  })
  export class AnimateurComponent implements OnInit {

  
    constructor(private router: Router,public formBuilder: FormBuilder, public userService: UserService, public animateurService: AnimateurService){    
    }
    
    ngOnInit(): void {
    }


}
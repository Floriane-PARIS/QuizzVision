import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";




@Component({
    selector: ' app-resultat-list',
    templateUrl: './resultat-list.component.html',
    styleUrls: ['./resultat-list.component.scss']
  })
  export class ResultatListComponent implements OnInit {
    
    @Input()
    user: User;
    public resultatList: FormGroup;

    constructor(public formBuilder: FormBuilder, public userService: UserService) {
        this.resultatList = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          handicap: [''],
          note: [''],
        });
    }
    

    ngOnInit(): void {
    }
    
    getNote(){
    }

}
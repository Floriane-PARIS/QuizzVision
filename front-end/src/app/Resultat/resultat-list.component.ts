import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: ' app-resultat-list',
    templateUrl: './resultat-list.component.html',
    styleUrls: ['./resultat-list.component.scss']
  })
  export class ResultatListComponent implements OnInit {

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

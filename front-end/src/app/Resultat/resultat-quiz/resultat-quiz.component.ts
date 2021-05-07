import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import { Game } from "src/models/game.model";
import { Quiz } from "src/models/quiz.model";
import { Resultat } from "src/models/Resultat.model";
import { User } from "src/models/user.model";
import { GameService } from "src/services/game.service";
import { QuizService } from "src/services/quiz.service";
import { UserService } from "src/services/user.service";


@Component({
    selector: ' app-resultat-quiz',
    templateUrl: './resultat-quiz.component.html',
    styleUrls: ['./resultat-quiz.component.scss']
  })
  export class ResultatQuizComponent implements OnInit {


    constructor(private router: Router) {

    }
  ngOnInit(): void {
  }

    backToResultatList(): void {
      this.router.navigate(['/resultat-list']);
    }

}

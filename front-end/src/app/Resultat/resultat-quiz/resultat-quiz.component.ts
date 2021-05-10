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
import { CommonModule } from "@angular/common";

@Component({
    selector: ' app-resultat-quiz',
    templateUrl: './resultat-quiz.component.html',
    styleUrls: ['./resultat-quiz.component.scss']
  })

  export class ResultatQuizComponent implements OnInit {

    public quizzes: Quiz[];
    public resultatList: FormGroup;

    constructor(private router: Router, public formBuilder: FormBuilder, private quizService: QuizService) {
      this.resultatList = this.formBuilder.group({
              firstName: [''],
              lastName: [''],
              handicap: [''],
              note: [''],
      });

      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      });

    }
  ngOnInit(): void {
  }

    backToResultatList(): void {
      this.router.navigate(['/resultat-list']);
    }

}

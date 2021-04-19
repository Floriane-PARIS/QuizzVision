import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Game } from "src/models/game.model";
import { Quiz } from "src/models/quiz.model";
import { Resultat } from "src/models/Resultat.model";
import { User } from "src/models/user.model";
import { GameService } from "src/services/game.service";
import { QuizService } from "src/services/quiz.service";
import { UserService } from "src/services/user.service";


@Component({
    selector: ' app-resultat-list',
    templateUrl: './resultat-list.component.html',
    styleUrls: ['./resultat-list.component.scss']
  })
  export class ResultatListComponent implements OnInit {
    
    public users: User[];
    public resultatList: FormGroup;
    public quizzes: Quiz[];
    public games: Game[];
    public length: number;
    public game:  Game;
    
 

    constructor(public formBuilder: FormBuilder, public userService: UserService, private quizService: QuizService, private gameService: GameService) {
        this.resultatList = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          handicap: [''],
          note: [''],
        });

        this.userService.users$.subscribe((users: User[]) => {
          this.users = users;
        });
        this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
          this.quizzes = quizzes;
        });
        this.gameService.games$.subscribe((games: Game[]) => {
          this.games = games;
        });
        this.gameService.gameSelected$.subscribe((game) => {
          this.game = game;
          this.length = game.score;
        });
        
    }
  ngOnInit(): void {
  } 

}
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import { Game } from "src/models/game.model";
import { Quiz } from "src/models/quiz.model";
import { User } from "src/models/user.model";
import { GameService } from "src/services/game.service";
import { QuizService } from "src/services/quiz.service";
import { UserService } from "src/services/user.service";
import {AnimateurService} from "../../../services/animateur.service";


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
    public game: Game;
    public user: User;
    public gameChose: boolean;
    public animateurId: string;


    constructor(private router: Router, public formBuilder: FormBuilder, public userService: UserService, private quizService: QuizService, private animateurService: AnimateurService, private gameService: GameService, private route: ActivatedRoute) {
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
        this.userService.userSelected$.subscribe((user) => {
              this.user = user;
            });
    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  dateGame(gameDate: Date): Date {
      const date = new Date(gameDate);
      return date;
  }

  getUser(): String {
    return this.user.firstName+" "+this.user.lastName;
  }

  details(game: Game): void {
   // this.userService.setSelectedUser(undefined);
   if(this.user == undefined){
      this.userService.setSelectedUser(undefined);
      this.router.navigate(['/' + this.animateurId + '/resultat-details/' + game.id + '/' + game.quizId]);
   } else {
          this.userService.setSelectedUser(this.user.id);
          this.router.navigate(['/' + this.animateurId + '/resultat-details/' + game.id + '/' + game.quizId + '/' + this.user.id]);
       }

  }

  delete(game: Game): void {
    // this.userService.setSelectedUser(undefined);
    this.gameService.deleteGame(game);

  }

  getUserName(game: Game): String {
      for (const user of this.users) {
                 if (game.userId == user.id) {
                       return user.firstName+" "+user.lastName;
                 }
      }
      return null;
  }

  getUserMaladie(game: Game): String {
        for (const user of this.users) {
                   if (game.userId == user.id) {
                         return user.maladies;
                   }
        }
        return null;
  }

  getQuizName(game: Game): String {
          for (const quiz of this.quizzes) {
                     if (game.quizId == quiz.id) {
                           return quiz.name;
                     }
          }
          return null;
   }

  getQuizLength(game: Game): number {
             for (const quiz of this.quizzes) {
                        if (game.quizId == quiz.id) {
                              return quiz.questions.length;
                        }
             }
             return 0;
  }


}

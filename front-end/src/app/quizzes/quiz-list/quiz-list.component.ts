import { Component, OnInit, Input, Output, EventEmitter, SystemJsNgModuleLoader} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Game} from '../../../models/game.model';
import {ThemeService} from "../../../services/theme.service";
import {AnimateurService} from "../../../services/animateur.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})

export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public user: User;
  public animateurId: string;

  constructor(private router: Router, private route: ActivatedRoute,  public animateurService: AnimateurService, public quizService: QuizService,  public userService: UserService, public themeService: ThemeService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
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

  quizSelected(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    console.log('event received from child:', quiz.id);
    this.router.navigate(['/' + this.animateurId + '/game-start/' + this.user.id + '/' + quiz.id]);
  }

  gameSelected(game: Game): void {
    console.log('event received from child:', game.id);
    this.router.navigate(['/' + this.animateurId + '/game/' + this.user.id + '/' + game.id]);
  }

  editQuiz(quiz: Quiz): void {
    console.log('event received from child:', quiz.id);
    this.router.navigate([ '/' + this.animateurId + '/edit-quiz/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }

  ajoutQuizz(): void{
    console.log('event received from child: new quiz');
    this.router.navigate(['/' + this.animateurId + '/quiz-form']);

  }

  ajoutTheme(): void{
    console.log('event received from child: new theme');
    this.router.navigate(['/' + this.animateurId + '/theme-list']);
  }
}

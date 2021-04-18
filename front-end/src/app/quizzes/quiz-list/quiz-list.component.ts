import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})

export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public user: User;

  constructor(private router: Router, private route: ActivatedRoute, public quizService: QuizService,  public userService: UserService) {
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
  }

  quizSelected(quiz: Quiz): void {
    console.log('event received from child:', quiz.id);
    this.router.navigate(['/game-start/' + this.user.id + '/' + quiz.id]);
  }

  editQuiz(quiz: Quiz): void {
    console.log('event received from child:', quiz.id);
    this.router.navigate(['/edit-quiz/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }

  retourAdmin(): void{
    this.router.navigate(['/quiz-list']);
  }
  ajoutQuizz(): void{
    console.log('event received from child: new quiz');
    this.router.navigate(['/quiz-form']);
    
  }

  ajoutTheme(): void{
    console.log('event received from child: new theme');
    this.router.navigate(['/theme-form']);
    
  }
}

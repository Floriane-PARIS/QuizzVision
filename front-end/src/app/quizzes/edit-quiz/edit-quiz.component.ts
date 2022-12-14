import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {Theme} from '../../../models/Theme.model';
import {ThemeService} from '../../../services/theme.service';
import {AnimateurService} from "../../../services/animateur.service";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  public quizTheme: string;
  public quizName: string;
  public themes: Theme[];
  public quiz: Quiz;
  public animateurId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router,  public animateurService: AnimateurService, private quizService: QuizService, public themeService: ThemeService) {
    this.quizService.quizSelected$.subscribe((quiz) =>  {
      this.quiz = quiz;
      this.quizService.retrieveQuizzes();
    });
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  modifQuizName(): void {
    const newName: string = this.quizName as string;
    // tslint:disable-next-line:triple-equals
    if (newName.trim() == '') {
      console.log('erreur');
      /*const dialogRef = this.dialog.open(EditQuizComponent, {
        height: '400px',
        width: '600px',
      });*/
    }
    else {
      this.quizService.renameQuiz(this.quiz, newName);
    }
  }

  modifQuizTheme(): void {
    const newName: string = this.quizTheme as string;
    this.quizService.changeQuizTheme(this.quiz, newName);
  }
}

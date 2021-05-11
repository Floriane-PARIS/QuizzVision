import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/Theme.model';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  public themes: Theme[];

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public themeService: ThemeService, private router: Router) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
  }

  ngOnInit(): void {
  }

  addQuiz(): void {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToCreate);
    if (quizToCreate.theme === '')
    {
      quizToCreate.theme = 'pas de thème';
    }
    this.quizService.addQuiz(quizToCreate);
    this.router.navigate(['/quiz-list']);
  }

  annule(): void {
    this.router.navigate(['/quiz-list']);
  }

  ajoutTheme(): void{
    console.log('event received from child: new theme');
    this.router.navigate(['/theme-list']);
  }

}

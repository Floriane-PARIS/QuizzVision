import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../../services/quiz.service';
import {Theme} from '../../../models/Theme.model';
import {ThemeService} from '../../../services/theme.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-search',
  templateUrl: './quiz-search.component.html',
  styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent implements OnInit {
  public quizName: string;
  public quizTheme: string;
  public themes: Theme[];
  public quizzes: Quiz[];

  constructor(public quizService: QuizService, public themeService: ThemeService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
    this.quizService.quizzes$.subscribe((quizes: Quiz[]) => {
      this.quizzes = quizes;
    });
    this.quizName = '';
    this.quizTheme = '';
  }

  ngOnInit(): void {
  }

  searchQuizName(): void {
    const quizToSearch: string = this.quizName as string;
    this.quizService.retrieveQuizzeName(quizToSearch);
  }

  searchQuizTheme(): void {
    const quizToSearch: string = this.quizTheme as string;
    this.quizService.retrieveQuizzeTheme(quizToSearch);
  }

  annule(): void {
    this.quizService.retrieveQuizzes();
  }
}

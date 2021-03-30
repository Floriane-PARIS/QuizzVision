import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-quiz-search',
  templateUrl: './quiz-search.component.html',
  styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent implements OnInit {
  public quizName: string;
  public quizTheme: string;

  constructor(public quizService: QuizService) {
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

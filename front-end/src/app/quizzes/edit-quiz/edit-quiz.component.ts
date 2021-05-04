import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quizName: string;
  public quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) =>  {
      this.quiz = quiz;
      this.quizService.retrieveQuizzes();
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  modifQuizName(): void {
    const newName: string = this.quizName as string;
    this.quizService.renameQuiz(this.quiz, newName);
  }
}

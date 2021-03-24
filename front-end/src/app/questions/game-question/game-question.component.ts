import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/question.model';


@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  valideQuestion(): void {
    console.log("Je valide cette réponse");
  }

  valideAnswer(): void {
    console.log("Je valide cette réponse");
  }

}

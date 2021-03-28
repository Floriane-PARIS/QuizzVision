import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Game } from '../../../models/game.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {GameService} from '../../../services/game.service';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {

  public quiz: Quiz;
  public gameForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService, private gameService: GameService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.initializeGameForm(quiz);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  private initializeGameForm(quiz: Quiz): void {
    if (quiz.questions.length > 0 ) {
      this.gameForm = this.formBuilder.group({
        quizId: [quiz.id],
        questionId: [quiz.questions[0].id]
      });
    }
  }

  addGame(): void {
    const gameToCreate = this.gameForm.getRawValue() as Game;
    this.gameService.addGame(gameToCreate);
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { GameComponent } from './games/game/game.component';
import { GameResponseComponent } from './games/game-response/game-response.component';
import { GameResultComponent } from './games/game-result/game-result.component';
import { GameStartComponent } from './games/game-start/game-start.component';
import { GameQuestionComponent} from './questions/game-question/game-question.component';
import { QuizSearchComponent } from './quizzes/quiz-search/quiz-search.component';
import { ConfigurationEditComponent } from './configurations/configuration-edit/configuration-edit.component';
import { ConfigurationFormComponent } from './configurations/configuration-form/configuration-form.component';
import { ConfigurationComponent } from './configurations/configuration/configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizSearchComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    ConfigurationComponent,
    ConfigurationFormComponent,
    ConfigurationEditComponent,
    GameComponent,
    GameResponseComponent,
    GameResultComponent,
    GameStartComponent,
    GameQuestionComponent,
    QuizSearchComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

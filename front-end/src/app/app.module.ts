import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
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
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
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
import { ConfigurationChoseComponent } from './configurations/configuration-chose/configuration-chose.component';
import { ThemeComponent } from './themes/theme/theme.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { EditThemeComponent } from './themes/edit-theme/edit-theme.component';
import { ThemeSearchComponent } from './themes/theme-search/theme-search.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';
import { UserSearchComponent } from './users/user-search/user-search.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ConfigurationJeuComponent } from './configurations/configuration-jeu/configuration-jeu.component';
import { ResultatListComponent } from './Resultat/resultat-list/resultat-list.component';
import { ResultatQuizComponent } from './Resultat/resultat-quiz/resultat-quiz.component';
import { ResultatDetailsComponent } from './Resultat/resultat-details/resultat-details.component';
import { ResultatSearchComponent} from './Resultat/resultat-search/resultat-search.component';
import { ConnexionFormComponent } from './animateurs/animateur-connexion/animateur-connexion.component';
import { InscriptionComponent } from './animateurs/animateur-inscription/animateur-inscription.component';
import { AnimateurComponent } from './animateurs/animateur/animateur.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimateurComponent,
    QuizListComponent,
    QuizSearchComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    EditQuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    UserSearchComponent,
    UserEditComponent,
    ConfigurationComponent,
    ConfigurationChoseComponent,
    ConfigurationFormComponent,
    ConfigurationEditComponent,
    GameComponent,
    GameResponseComponent,
    GameResultComponent,
    GameStartComponent,
    GameQuestionComponent,
    QuizSearchComponent,
    ThemeComponent,
    ThemeListComponent,
    EditThemeComponent,
    ThemeSearchComponent,
    ThemeFormComponent,
    ResultatListComponent,
    ResultatQuizComponent,
    ResultatDetailsComponent,
    ResultatSearchComponent,
    ConfigurationJeuComponent,
    ConnexionFormComponent,
    InscriptionComponent,
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

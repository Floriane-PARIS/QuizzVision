import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ConfigurationEditComponent } from './configurations/configuration-edit/configuration-edit.component';
import { GameStartComponent } from './games/game-start/game-start.component';
import { GameComponent } from './games/game/game.component';
import { GameQuestionComponent } from './questions/game-question/game-question.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {UserEditComponent}  from './users/user-edit/user-edit.component';
import { UserSearchComponent } from './users/user-search/user-search.component';
import { UserComponent } from './users/user/user.component';
import {ConfigurationJeuComponent} from './configurations/configuration-jeu/configuration-jeu.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';
import { ResultatListComponent } from './Resultat/resultat-list/resultat-list.component';
import { ResultatQuizComponent } from './Resultat/resultat-quiz/resultat-quiz.component';
import { ResultatDetailsComponent } from './Resultat/resultat-details/resultat-details.component';
import { InscriptionComponent } from './animateurs/animateur-inscription/animateur-inscription.component';
import { ConnexionFormComponent } from './animateurs/animateur-connexion/animateur-connexion.component';
import { ConfigurationComponent } from './configurations/configuration/configuration.component';
import {AnimateurComponent} from './animateurs/animateur/animateur.component';




const routes: Routes = [
    {path: ':animateurId/theme-list', component: ThemeListComponent},
    {path: 'theme-form', component: ThemeFormComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'user-list', component: UserListComponent},
    {path: ':animateurId/user-edit/:id', component: UserEditComponent},
    {path: 'user-list/:idAnimateur/:id', component: ConnexionFormComponent},
    {path: 'user-form', component: UserFormComponent},
    {path: ':animateurId/quiz-list', component: QuizListComponent},
    {path: 'quiz-list/:id', component: QuizListComponent},
    {path: ':animateurId/quiz-form', component: QuizFormComponent},
    {path: 'user-search', component: UserSearchComponent},
    {path: 'configuration-edit/:id', component: ConfigurationEditComponent},
    {path: ':animateurId/edit-quiz/:id', component: EditQuizComponent},
    {path: 'edit-theme/:id', component: EditThemeComponent},
    {path: 'game-start/:idUser/:id', component: GameStartComponent},
    {path: 'game/:idUser/:id', component: GameComponent},
    {path: 'resultat-quiz', component: ResultatQuizComponent},
    {path: 'resultat-list', component: ResultatListComponent},
    {path: 'resultat-list/:id', component: ResultatListComponent},
    {path: 'resultat-details/:gameId/:quizId', component: ResultatDetailsComponent},
    {path: 'resultat-details/:gameId/:quizId/:userId', component: ResultatDetailsComponent},
    {path: 'configuration-jeu/:idUser/:id', component: ConfigurationJeuComponent},
    {path: 'animateur-inscription', component: InscriptionComponent},
    {path: 'animateur-connexion', component: ConnexionFormComponent},
    {path: 'game-question/:id', component: GameQuestionComponent},
    { path: '', redirectTo: '/animateur', pathMatch: 'full' },
    {path: 'animateur', component: AnimateurComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

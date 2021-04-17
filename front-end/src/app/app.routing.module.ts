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
import { ResultatListComponent } from './resultat/resultat-list.component';
import {ConfigurationJeuComponent} from './configurations/configuration-jeu/configuration-jeu.component';



const routes: Routes = [
    {path: 'theme-list', component: ThemeListComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user-edit/:id', component: UserEditComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'quiz-list/:id', component: QuizListComponent},
    {path: 'user-search', component: UserSearchComponent},
    {path: 'configuration-edit/:id', component: ConfigurationEditComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'edit-theme/:id', component: EditThemeComponent},
    {path: 'game-start/:idUser/:id', component: GameStartComponent},
    {path: 'game/:idUser/:id', component: GameComponent},
    {path: 'resultat-list', component: ResultatListComponent},
    {path: 'configuration-jeu', component: ConfigurationJeuComponent},
    // {path: 'game-question/:id', component: GameQuestionComponent},
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

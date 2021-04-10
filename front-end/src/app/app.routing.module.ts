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

const routes: Routes = [
    {path: 'theme-list', component: ThemeListComponent},
    {path: 'user-list', component: UserListComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'configuration-edit', component: ConfigurationEditComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'edit-theme/:id', component: EditThemeComponent},
    {path: 'game-start/:id', component: GameStartComponent},
    {path: 'game/:id', component: GameComponent},
    //{path: 'game-question/:id', component: GameQuestionComponent},
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

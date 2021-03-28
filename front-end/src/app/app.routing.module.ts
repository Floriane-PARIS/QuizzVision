import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ConfigurationListComponent } from './configurations/configuration-list/configuration-list.component';
import { GameStartComponent } from './games/game-start/game-start.component';
import { GameComponent } from './games/game/game.component';
import { GameQuestionComponent } from './questions/game-question/game-question.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'configuration-list', component: ConfigurationListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'game-start/:id', component: GameStartComponent},
    {path: 'game/:id', component: GameComponent},
    {path: 'game-question/:id', component: GameQuestionComponent},
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

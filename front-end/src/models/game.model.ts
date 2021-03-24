import { Question } from './question.model';
import { Answer } from './question.model';

export interface Game {
  userId: number;
  quizId: number;
  questions: Question[];
  answers: Answer[];
}

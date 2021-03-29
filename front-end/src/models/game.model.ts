import { Question } from './question.model';
import { Answer } from './question.model';

export interface Game {
  id: string;
  quizId: string;
  questionId: string;
  answers: Answer[];
}

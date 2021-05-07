import { Question } from './question.model';
import { Answer } from './question.model';

export interface Game {
  id: string;
  quizId: string;
  userId: string;
  question: Question[];
  answers: string[];
  score: number;
  date: Date;
}

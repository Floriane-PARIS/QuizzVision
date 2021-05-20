import { Question } from './question.model';
import {Configuration} from './configuration.model';

export interface Game {
  id: string;
  quizId: string;
  userId: string;
  question: Question[];
  answers: string[];
  score: number;
  date: Date;
  configuration: Configuration[];
}

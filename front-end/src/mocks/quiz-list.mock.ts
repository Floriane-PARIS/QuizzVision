import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    id: '1',
    label: 'Jean Gabin a joué dans...',
    numeroQuestion: 1,
    answers: [
        {
            value: 'Les tuches II',
        },
        {
            value: 'La grande illusion',
        }
    ],
    correctAnswer: 'Les tuches II'
    
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [],
    },
    {
        id: '2',
        name: 'Les technos WEB',
        questions: [],
    }
];

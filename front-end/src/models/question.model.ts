export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    label: string;
    answer1: string;
    answer2: string;
    answer3: string;
    correctAnswer: string;
}

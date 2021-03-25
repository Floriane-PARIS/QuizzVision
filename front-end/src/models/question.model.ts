export interface Answer {
    type?: string;
    value: string;
}

export interface Question {
    id: string;
    numberQuestion: number;
    label: string;
    answers: Answer[];
    correctAnswer: string;
}

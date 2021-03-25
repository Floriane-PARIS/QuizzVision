export interface Answer {
    type?: string;
    value: string;
}

export interface Question {
    id: string;
    numeroQuestion: Int16Array;
    label: string;
    answers: Answer[];
    correctAnswer: string;
}

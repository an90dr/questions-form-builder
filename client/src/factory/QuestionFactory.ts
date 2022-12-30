import {IQuestion} from "../interfaces/Questions";

const emptyQuestion = (): IQuestion => ({
    _id: '',
    question: '',
    quizId: '',
    author: ''
});

export {emptyQuestion};
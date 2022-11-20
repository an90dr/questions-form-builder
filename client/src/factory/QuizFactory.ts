import {IQuiz} from "../interfaces/Quiz";

const emptyQuiz = (): IQuiz => ({
    header: '',
    author: []
});

export {emptyQuiz};
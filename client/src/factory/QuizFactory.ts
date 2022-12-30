import {IQuiz} from "../interfaces/Quiz";

const emptyQuiz = (): IQuiz => ({
    _id: '',
    header: '',
    author: '',
    user: []
});

export {emptyQuiz};
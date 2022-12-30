export interface IQuestion {
    _id: string,
    question: string,
    quizId: string,
    author: string
}


export interface IQuestionResponse {
    data: IQuestion[]
}
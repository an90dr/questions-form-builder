import {IUser} from "./User";

export interface IQuiz {
    header: string,
    author?: string,
    user: IUser[],
    form?: string;
}


export interface IQuizResponse {
    data: IQuiz[]
}
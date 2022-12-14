import {IUser} from "./User";

export interface IQuiz {
    _id: string,
    header: string,
    author?: string,
    user: IUser[],
    form?: string;
}


export interface IQuizResponse {
    data: IQuiz[]
}

export interface IAnswer {
    radioValue: number,
    value: string
}
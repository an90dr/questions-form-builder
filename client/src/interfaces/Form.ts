import {IUser} from "./User";

export interface IForm {
    quizHeader: string,
    user: IUser
}

export interface IFormResponse {
    data: IForm
}
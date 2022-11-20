import {IUser} from "./User";

export interface IQuiz {
    header: string,
    author?: IUser[]
}
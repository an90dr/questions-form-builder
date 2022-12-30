import {IUser} from "./User";
import {IQuestion} from "./Questions";

export interface IForm {
    quizHeader: string,
    user: IUser
}

export interface IFormResponse {
    data:
        {
            form: IForm,
            questions: IQuestion[]
        }
}
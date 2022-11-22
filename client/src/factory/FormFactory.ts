import {IForm} from "../interfaces/Form";
import { emptyUser } from "./UserFactory";

const emptyForm = (): IForm => ({
    quizHeader: '',
    user: emptyUser()
});

export {emptyForm};
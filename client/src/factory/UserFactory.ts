import {IUser} from "../interfaces/User";

const emptyUser = (): IUser => ({
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    password: ''
});

export {emptyUser};
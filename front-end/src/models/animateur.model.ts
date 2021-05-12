import { User } from "./user.model";

export interface Animateur {
    name: string;
    password: string;
    mail:string;
    passwordConfirmed: string;
    //users: User[];
    id: string;
}
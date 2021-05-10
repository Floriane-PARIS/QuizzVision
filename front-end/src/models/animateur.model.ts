import { User } from "./user.model";

export interface Animateur {
    name: string;
    password: string;
    users: User[];
    id: string;
   
}
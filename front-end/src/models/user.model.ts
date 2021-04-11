import { Configuration } from "./configuration.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    encadreur: string;
    maladies: string;
    commentaires: string;
    //configuration: Configuration[];
    date: Date;
}
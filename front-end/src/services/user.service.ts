import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Configuration } from 'src/models/configuration.model';
import {Quiz} from "../models/quiz.model";
import {Question} from "../models/question.model";
import {Game} from "../models/game.model";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of user.
   */
  //private users: User[] = [];

  /*
   The list of users.
   The list is retrieved from the mock.
   */
   private users: User[] = USER_LIST;

  /*
   Observable which contains the list of the user.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public currentUser: User;
  public currentConfiguration: Configuration;
  public userSelected$: Subject<User> = new Subject();
  public configurationNext$: Subject<Configuration> = new Subject();

  private userUrl = serverUrl + '/users';
  private configurationPath = 'configurations';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    console.log("retrieve");
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      console.log(this.users);
      this.users$.next(this.users);
    });
  }

  //changes
  retrieveUserName(userFName: string, userLName: string): void {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < userList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (userList[i].firstName === userFName && userList[i].lastName === userLName){
         // this.res.push(userList[i]);
          this.users.push(userList[i]);
          console.log(userList[i]);
        }
      }
      for (let i = this.users.length; i < 0; i--){
        if (this.users[i].lastName !== userLName){
          this.users.pop();
          //console.log(this.res[i]);
        }
      }
      this.users$.next(this.users);
    });
  }

  retrieveUserTroubles(userTroubles: string): void {
    this.http.get<User[]>(this.userUrl).subscribe((userList) => {
      this.users = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < userList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (userList[i].maladies == userTroubles){
          this.users.push(userList[i]);
          console.log(userList[i])
        }
      }
      this.users$.next(this.users);
    });
  }

  updateUserComments(user: User, comments: string): void {
    const commentsWrite = {commentaires : comments};
    const userUrl = this.userUrl + '/' + user.id ;
    this.http.put<User>(userUrl, commentsWrite, this.httpOptions).subscribe((user) => {
      this.retrieveUsers();
      this.setSelectedUser(user.id);
    });

  }

  updateUser(user: User): void {
    const userWrite = { firstName: user.firstName, lastName: user.lastName, encadreur: user.encadreur, maladies: user.maladies, commentaires: user.commentaires, age: user.age };
    const userUrl = this.userUrl + '/' + user.id ;
    this.http.put<User>(userUrl, userWrite, this.httpOptions).subscribe((user: User) => this.userSelected$.next(user));
  }

  getlastUser(): User {
    if (this.users.length > 0) {
      return this.users[this.users.length - 1];
    } else {
      return undefined;
    }
  }

  addUser(user: User): void {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
    console.log("ajouter");
  }

  setSelectedUser(userId: string): void {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.currentUser = user;
      this.userSelected$.next(user);
    });
  }

  deleteUser(user: User): void {
    console.log("works");
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());

  }

  getConfiguration(userId: string): void{
    const configurationUrl = this.userUrl + '/' + userId + '/' + this.configurationPath;
    this.http.get<Configuration[]>(configurationUrl).subscribe((configurationNext: Configuration[]) => {
      if (configurationNext.length > 0 ) {
        this.setSelectedUser(userId);
        this.currentConfiguration = configurationNext[configurationNext.length - 1];
        this.configurationNext$.next(configurationNext[configurationNext.length - 1]);
      }
    });
  }

  nextConfiguration(user: User, configuration: Configuration): void{
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath + '/' + configuration.id;
    this.http.get<Configuration>(configurationUrl).subscribe((configurationNext) => {
      this.configurationNext$.next(configurationNext);
    });
  }

  addConfiguration(user: User, configuration: Configuration): void {
    if(configuration.handicap == 'Autres'){
      configuration.shift = 60;
    }
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath;
    this.http.post<Configuration>(configurationUrl, configuration, this.httpOptions).subscribe(() => {
      this.setSelectedUser(user.id);
     });
    this.currentConfiguration = configuration;
    this.currentUser = user;
  }

  addConfiguration1(configuration: Configuration): void {
    this.addConfiguration(this.currentUser, configuration);
  }

  deleteConfiguration(user: User, configuration: Configuration): void {
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath + '/' + configuration.id;
    this.http.delete<Configuration>(configurationUrl, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }

  putConfiguration(user: User, configuration: Configuration): void {
    this.currentConfiguration = configuration;
    this.currentUser = user;
    console.log(this.currentConfiguration);

    const configurationWrite = { handicap : configuration.handicap, bold : configuration.bold, size: configuration.size, police : configuration.police, bright : configuration.bright, contrast : configuration.contrast, shift : configuration.shift };
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath + '/' + configuration.id;

    this.http.put<Configuration>(configurationUrl, configurationWrite, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }

}

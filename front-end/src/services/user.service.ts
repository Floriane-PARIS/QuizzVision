import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Configuration } from 'src/models/configuration.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of user.
   */
  private users: User[] = [];
  private res: User[] = []; // changes 

  /*
   The list of users.
   The list is retrieved from the mock.
   */
   //private users: User[] = USER_LIST;

  /*
   Observable which contains the list of the user.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject([]);

  public userSelected$: Subject<User> = new Subject();
  public configurationNext$: Subject<Configuration> = new Subject();

  private userUrl = serverUrl + '/users';
  private configurationPath = 'configuration';

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
      this.res = [];
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

    const commentsWrite = {firstName: user.firstName, lastName: user.lastName, encadreur: user.encadreur, maladies: user.maladies,
       commentaires : comments, configuration: user.configuration, date: user.date};
    const userUrl = this.userUrl + '/' + user.id ;
    this.http.put<User>(userUrl, commentsWrite, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }

  /*putQuestion(quiz: Quiz, question: Question): void {
    const questionWrite = {label : question.label };
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.put<Question>(questionUrl, questionWrite, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    for (const answer of question.answers) {
      this.putAnswer(quiz, question, answer);
    }
  }*/


  addUser(user: User): void {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
    console.log("ajouter");
  }

  setSelectedUser(userId: string): void {
    const urlWithId = this.userUrl + '/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }

  deleteUser(user: User): void {
    console.log("works");
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());

  }


  //changes
  /*getConfiguration(userId: string, configurationId: string): void{
    const configurationUrl = this.userUrl + '/' + userId + '/' + this.configurationPath + '/' + configurationId;
    this.http.get<Configuration>(configurationUrl).subscribe((configurationNext) => {
      this.configurationNext$.next(configurationNext);
    });
  }

  addConfiguration(user: User, configuration: Configuration): void {
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath;
    this.http.post<Configuration>(configurationUrl, configuration, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }

  deleteConfiguration(user: User, configuration: Configuration): void {
    const configurationUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath + '/' + configuration.id;
    this.http.delete<Configuration>(configurationUrl, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }

  putQuestion(user: User, configuration: Configuration): void {
    const configurationWrite = {police : configuration.police, bold : configuration.bold, bright : configuration.bright, contrast : configuration.contrast, size: configuration.size, shift : configuration.shift };
    const questionUrl = this.userUrl + '/' + user.id + '/' + this.configurationPath + '/' + configuration.id;
    this.http.put<Configuration>(questionUrl, configurationWrite, this.httpOptions).subscribe(() => this.setSelectedUser(user.id));
  }*/
}

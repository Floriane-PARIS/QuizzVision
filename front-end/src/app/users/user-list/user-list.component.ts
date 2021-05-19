import { Component, OnInit, Input} from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";
import {AnimateurService} from '../../../services/animateur.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  user: User;
  public editUserChose: string;
  public animateurId: string;


  public userList: User[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private quizService: QuizService,  private animateurService: AnimateurService) {
    this.editUserChose = '';
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  ngOnInit(): void {
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  selectUser(user: User): void {
    this.quizService.setSelectedQuiz(undefined);
    this.userService.setSelectedUser(user.id);
    // this.userService.retrieveUsers();
    console.log('event received from child:', user.id);
    this.router.navigate(['/' + this.animateurId + '/quiz-list/' + user.id]);
  }

  editUser(user: User): void {
    console.log('edit');
    this.editUserChose = user.id;
  }

  editUserDone(user: User): void {
    this.userService.updateUser(user);
    this.editUserChose = '';
  }

  ajoutPatient(): void{
    console.log('event received from child: new user');
    this.router.navigate(['/' + this.animateurId + '/user-form']);
  }

}

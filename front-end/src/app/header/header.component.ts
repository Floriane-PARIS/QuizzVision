import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Answer, Question} from "../../models/question.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public user: User;

  constructor( public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {GameService} from '../../services/game.service';
import {Answer, Question} from "../../models/question.model";
import { Game } from 'src/models/game.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  public user: User;
  public game: Game;

  constructor( private router: Router, public userService: UserService, public gameService: GameService) {
    this.userService.userSelected$.subscribe((user) => {
      console.log('userBefore', this.user);
      this.user = user;
      console.log('userAfter', this.user);
    });
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
    });
  }

  ngOnInit(): void {
  }

  otherUsers(): void {
    // this.user = undefined;
    this.userService.setSelectedUser(undefined);
    console.log('mise a JOUR', this.user);
    this.router.navigate(['/user-list']);
  }

}

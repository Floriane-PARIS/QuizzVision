import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {GameService} from '../../services/game.service';
import {Answer, Question} from "../../models/question.model";
import { Game } from 'src/models/game.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();


 // public user: User;
  public game: Game;

  constructor( public userService: UserService, public gameService: GameService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-game-quit',
  templateUrl: './game-quit.component.html',
  styleUrls: ['./game-quit.component.scss']
})
export class GameQuitComponent implements OnInit {

  message: string;

  constructor() {
  }

  ngOnInit(): void {
  }


}

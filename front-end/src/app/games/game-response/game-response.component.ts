import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-game-response',
  templateUrl: './game-response.component.html',
  styleUrls: ['./game-response.component.scss']
})
export class GameResponseComponent implements OnInit {

  @Input()
  answer: Answer;

  constructor() {
  }

  ngOnInit(): void {
  }


}

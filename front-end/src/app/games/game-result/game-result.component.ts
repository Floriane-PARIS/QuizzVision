import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  @Input()
  message: string;
  @Input()
  shift: number;

  constructor() {
  }

  ngOnInit(): void {
  }


}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Configuration } from '../../../models/configuration.model';
import {Validators} from "@angular/forms";
import {Answer, Question} from "../../../models/question.model";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {

  @Input()
  configuration: Configuration;

  @Output()
  deleteConfiguration: EventEmitter<Configuration> = new EventEmitter();

  public question: Question;

  constructor() {
    this.question = this.createQuestionTemoin();
  }

  ngOnInit(): void {
  }

  createQuestionTemoin(): Question{
    let answer1: Answer;
    answer1 = {
      id: '1',
      value: 'Paris',
      isCorrect: true,
    };
    let answer2: Answer;
    answer2 = {
      id: '2',
      value: 'Marseille',
      isCorrect: false,
    };

    let question: Question;
    question = {
      id: '0',
      label: 'Quelle est la Capital de la France ?',
      answers: [answer1, answer2],
    };
    return question;
  }

  delete(){
    this.deleteConfiguration.emit(this.configuration);
  }

  getBold(){
      return this.configuration.bold;
  }

  getPolice(){
      return this.configuration.police;
  }

  getSize(){
      return this.configuration.size+"px";
  }

  getBright(){
    return "brightness("+this.configuration.bright+"%)";
  }
  getContrast(){
    return "contrast("+this.configuration.contrast+"%)";
  }
  getFiltre(){
    return this.getBright() + " " + this.getContrast();
  }
  getOpacity(){
    return this.configuration.opacity+ "px";
  }

}


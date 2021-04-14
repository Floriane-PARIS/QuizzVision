import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';
import {Configuration} from '../../../models/configuration.model';
import {ConfigurationService} from '../../../services/configuration.service';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  public root = document.documentElement;

  @Input()
  question: Question;
  @Input()
  configuration: Configuration;
  @Input()
  isValided: boolean;
  @Input()
  answer: Answer;

  @Output()
  valideQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  valideAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor(private userService: UserService) {
    this.userService.configurationNext$.subscribe((configuration) => {
      this.configuration = configuration;
      this.shift();
    });
  }

  ngOnInit(): void {
  }

  shift(): void {
    const value = this.configuration.shift;
    this.root.style.setProperty('--slider', value.toString());
  }

  choseAnswer(answer: Answer): void {
    this.valideAnswer.emit(answer);

  }

  valideQuestionAnswered(): void {
    this.valideQuestion.emit(this.question);
  }

  getBold(){
      if(this.configuration != undefined){
           return this.configuration.bold;
      }
       return 'normal';
  }


  getPolice(){
      if(this.configuration != undefined){
         return this.configuration.police;
      }
      return 'Arial';
  }

  getSize(){
      if(this.configuration != undefined){
        return this.configuration.size+"px";
      }
      return "22px";
  }

  getBright(){
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%"
  }

  getContrast(){
    if(this.configuration != undefined){
      return this.configuration.bright+ "%";
    }
    return "20%"
  }

  getFiltre(){
      return this.getBright() + " " + this.getContrast();
  }

}

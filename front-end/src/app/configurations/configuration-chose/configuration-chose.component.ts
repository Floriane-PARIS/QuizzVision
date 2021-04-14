import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Configuration } from '../../../models/configuration.model';
import {Answer, Question} from "../../../models/question.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-configuration-chose',
  templateUrl: './configuration-chose.component.html',
  styleUrls: ['./configuration-chose.component.scss']
})

export class ConfigurationChoseComponent implements OnInit {

  @Input()
  configuration: Configuration;
  @Output()
  deleteConfiguration: EventEmitter<Configuration> = new EventEmitter();


  constructor() {
    console.log('chose', this.configuration);
  }

  ngOnInit(): void {
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

}


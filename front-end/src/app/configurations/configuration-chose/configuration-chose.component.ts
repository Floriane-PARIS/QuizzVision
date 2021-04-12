import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Configuration } from '../../../models/configuration.model';
import {Answer, Question} from "../../../models/question.model";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-configuration-chose',
  templateUrl: './configuration-chose.component.html',
  styleUrls: ['./configuration-chose.component.scss']
})

export class ConfigurationChoseComponent implements OnInit {

  @Output()
  deleteConfiguration: EventEmitter<Configuration> = new EventEmitter();

  public configuration: Configuration;

  constructor(private configurationService: ConfigurationService) {
    this.configurationService.configurations$.subscribe((configurations) => {
      // console.log('[ConfigurationEditComponent] configurations into subscribe: ', configurations);
      if (configurations.length > 0) {
        this.configuration = configurations[configurations.length - 1];
      } else {
        this.configuration = undefined;
      }
    });
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

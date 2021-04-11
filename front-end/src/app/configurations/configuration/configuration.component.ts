import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Configuration } from '../../../models/configuration.model';

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

  constructor() { }

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
  getOpacity(){
    return this.configuration.opacity+ "px";
  }

}


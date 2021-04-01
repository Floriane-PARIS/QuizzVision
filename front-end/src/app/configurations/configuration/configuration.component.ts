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

  constructor() { }

  ngOnInit(): void {
  }

}

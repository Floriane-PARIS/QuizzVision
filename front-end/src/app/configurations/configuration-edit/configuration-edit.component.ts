import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/services/configuration.service';
import { Configuration } from '../../../models/configuration.model';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.scss']
})

export class ConfigurationEditComponent implements OnInit {

  public configurationList: Configuration[] = [];
  public configuration: Configuration;
  public root = document.documentElement;

  constructor(private configurationService: ConfigurationService) {
    this.initCss();
    this.configurationService.configurations$.subscribe((configurations) => {
     // console.log('[ConfigurationEditComponent] configurations into subscribe: ', configurations);
     this.configurationList = configurations;
     if (configurations.length > 0){
        this.configuration = configurations[configurations.length - 1];
        this.shift();
     } else {
        this.configuration = undefined;
     }
     });

  }

  ngOnInit(): void {
  }

  deleteConfiguration(configuration: Configuration): void{
    console.log('[Delete]configuration ', configuration);
    this.configurationService.deleteConfiguration(configuration);
  }

  initCss(): void {
    const top = 75;
    const left =  600;
    const height = 955;
    const width = 1500;
    this.root.style.setProperty('--top', top.toString());
    this.root.style.setProperty('--left', left.toString());
    this.root.style.setProperty('--height', height.toString());
    this.root.style.setProperty('--width', width.toString());
  }

  shift(): void {
    const value = this.configuration.shift;
    console.log('value', value);
    this.root.style.setProperty('--slider', value.toString());
  }


}

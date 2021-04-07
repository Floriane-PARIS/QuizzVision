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

  constructor(private configurationService: ConfigurationService) {
   this.configurationService.configurations$.subscribe((configurations) => {
     //console.log('[ConfigurationEditComponent] configurations into subscribe: ', configurations);
     this.configurationList = configurations;
     if(configurations.length>0){
        this.configuration = configurations[configurations.length-1];
     } else {
        this.configuration = undefined;
     }
   })

  }

  ngOnInit(): void {
  }

  deleteConfiguration(configuration: Configuration): void{
    console.log("[Delete]configuration ", configuration);
    this.configurationService.deleteConfiguration(configuration);
  }


}

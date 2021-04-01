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

  constructor(private configurationService: ConfigurationService) {
   this.configurationService.configurations$.subscribe((configurations) => {
     console.log('[ConfigurationEditComponent] configurations into subscribe: ', configurations);
     this.configurationList = configurations;
   })

  }

  ngOnInit(): void {
  }

}

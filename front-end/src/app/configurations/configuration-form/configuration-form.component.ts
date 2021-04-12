import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Configuration } from '../../../models/configuration.model';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss']
})

export class ConfigurationFormComponent implements OnInit {

  public configurationForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private configurationService: ConfigurationService) {
    this.configurationForm =  this.formBuilder.group({
      handicap: ['Glaucome'],
      bold: ['normal'],
      size: ['22'],
      police: ['Arial'],
      bright: ['100'],
      contrast: ['100'],
      shift: ['60'],
      opacity: ['0.5']
    });
  }

  ngOnInit(): void {
  }

  addConfiguration(): void {
    // ajouter une configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    console.log('[Add]configuration: ', configurationToCreate);
    this.configurationService.addConfiguration(configurationToCreate);
  }
}

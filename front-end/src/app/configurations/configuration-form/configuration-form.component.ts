import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Configuration } from '../../../models/configuration.model';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss']
})

export class ConfigurationFormComponent implements OnInit {

  @Input()
  user: User;
  public configurationForm: FormGroup;
  public handicap: string;

  constructor(public formBuilder: FormBuilder, private userService: UserService) {
    this.configurationForm =  this.formBuilder.group({
      handicap: ['Glaucome'],
      bold: ['normal'],
      size: ['22'],
      police: ['Arial'],
      bright: ['100'],
      contrast: ['100'],
      shift: ['60']
    });
    this.handicap = 'Glaucome';
  }

  ngOnInit(): void {
  }

  addConfiguration(): void {
    // ajouter une configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    console.log('[Add]configuration: ', configurationToCreate);
    this.userService.addConfiguration(this.user, configurationToCreate);
    console.log("handicap: " + this.configurationForm);
  }
}

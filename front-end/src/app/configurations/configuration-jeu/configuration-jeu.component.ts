import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Configuration} from '../../../models/configuration.model';

@Component({
  selector: 'app-configuration-jeu',
  templateUrl: './configuration-jeu.component.html',
  styleUrls: ['./configuration-jeu.component.scss']
})
export class ConfigurationJeuComponent implements OnInit {
  @Input()
  user: User;
  configuration: Configuration;
  public configurationForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private userService: UserService) {
    this.configuration = this.userService.currentConfiguration;
    this.user = this.userService.currentUser;
    if (this.configuration != undefined) {
      this.configurationForm =  this.formBuilder.group({
        handicap: [this.configuration.handicap],
        bold: [this.configuration.bold],
        size: [this.configuration.size],
        police: [this.configuration.police],
        bright: [this.configuration.bright],
        contrast: [this.configuration.contrast],
        shift: [this.configuration.shift]
      });
    }
    else {
      this.configurationForm =  this.formBuilder.group({
        handicap: ['Glaucome'],
        bold: ['normal'],
        size: ['22'],
        police: ['Arial'],
        bright: ['100'],
        contrast: ['100'],
        shift: ['60']
      });
    }
  }

  ngOnInit(): void {
  }

  getBold(){
    return this.configuration.bold;
  }

  getPolice(){
    return this.configuration.police;
  }

  getSize(){
    return this.configuration.size + 'px';
  }

  getBright(){
    return 'brightness(' + this.configuration.bright + '%)';
  }
  getContrast(){
    return 'contrast(' + this.configuration.contrast + '%)';
  }
  getFiltre(){
    return this.getBright() + ' ' + this.getContrast();
  }
  getShift(){
    return this.configuration.shift;
  }

  addConfiguration(): void {
    // ajouter une configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    if(this.user != undefined) {
      this.userService.addConfiguration(this.user, configurationToCreate);
    }
    else
    {
      this.userService.addConfiguration1(configurationToCreate);
    }
    this.configuration = this.userService.currentConfiguration;
  }
}

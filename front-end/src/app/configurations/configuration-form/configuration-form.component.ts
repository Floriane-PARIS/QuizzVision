import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Configuration } from '../../../models/configuration.model';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss']
})

export class ConfigurationFormComponent implements OnInit {

  public user: User;
  public configuration: Configuration;
  public configurationForm: FormGroup;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, private userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.userService.configurationNext$.subscribe((configuration) => {
        this.configuration = configuration;
        if (this.configuration !== undefined) {
          this.configurationForm = this.formBuilder.group({
            handicap: [this.configuration.handicap],
            bold: [this.configuration.bold],
            size: [this.configuration.size],
            police: [this.configuration.police],
            bright: [this.configuration.bright],
            contrast: [this.configuration.contrast],
            shift: [this.configuration.shift]
          });
        } else {
          this.configurationForm = this.formBuilder.group({
            handicap: [this.user.maladies],
            bold: ['normal'],
            size: ['22'],
            police: ['Arial'],
            bright: ['100'],
            contrast: ['100'],
            shift: ['60']
          });
        }
      });
    });
    if (this.configurationForm === undefined) {
      this.configurationForm = this.formBuilder.group({
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
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  addConfiguration(): void {
    // ajouter une configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    console.log('[Add]configuration: ', configurationToCreate);
    this.userService.addConfiguration(this.user, configurationToCreate);
  }
}

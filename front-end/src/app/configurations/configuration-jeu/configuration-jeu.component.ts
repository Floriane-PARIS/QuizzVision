import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Configuration} from '../../../models/configuration.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-configuration-jeu',
  templateUrl: './configuration-jeu.component.html',
  styleUrls: ['./configuration-jeu.component.scss']
})
export class ConfigurationJeuComponent implements OnInit {

  public user: User;
  public gameId: string;
  public configuration: Configuration;
  public root = document.documentElement;
  public configurationForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, private userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.userService.configurationNext$.subscribe((configuration) => {
        this.configuration = configuration;
        this.shift();
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
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  shift(): void {
    const value = this.configuration.shift;
    this.root.style.setProperty('--slider', value.toString());
  }

  backToGame(): void {
    this.router.navigate(['/game/' + this.user.id + '/' + this.gameId]);
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
    // add a configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    console.log('[Add]configuration: ', configurationToCreate);
    this.userService.addConfiguration(this.user, configurationToCreate);
  }
}

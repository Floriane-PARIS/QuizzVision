import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../models/configuration.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {AnimateurService} from '../../../services/animateur.service';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.scss']
})

export class ConfigurationEditComponent implements OnInit {

  public configurationList: Configuration[] = [];
  public configuration: Configuration;
  public root = document.documentElement;
  public user: User;
  public animateurId: string;

  constructor(private userService: UserService, private animateurService: AnimateurService, private route: ActivatedRoute) {
    this.initCss();
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.userService.configurationNext$.subscribe((configuration) => {
        // console.log('configuration', configuration);
        this.configuration = configuration;
        // console.log('confi', this.configuration !== undefined);
        if (this.configuration !== undefined) {
          this.shift();
        }
      });
    });
    /*this.userService.configurationNext$.subscribe((configuration) => {
      console.log('configuration', configuration);
      this.configuration = configuration;
      this.shift();
    });*/
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }

  deleteConfiguration(configuration: Configuration): void{
    console.log('[Delete]configuration ', configuration);
    this.userService.deleteConfiguration(this.user, configuration);
  }

  initCss(): void {
    const top = 75;
    const left =  600;
    this.root.style.setProperty('--top', top.toString());
    this.root.style.setProperty('--left', left.toString());
  }

  shift(): void {
    const value = this.configuration.shift;
    this.root.style.setProperty('--slider', value.toString());
  }


}

import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../models/configuration.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

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

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.initCss();
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.userService.getConfiguration(this.user.id);
    });
    this.userService.configurationNext$.subscribe((configuration) => {
      this.configuration = configuration;
      this.shift();
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
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

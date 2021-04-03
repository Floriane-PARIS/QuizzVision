import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/Theme.model';
import {Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public themeList: Theme[] = [];

  constructor(private router: Router, public themeService: ThemeService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
  }

  editTheme(theme: Theme): void {
    console.log('event received from child:', theme.subject);
    this.router.navigate(['/edit-theme/' + theme.subject]);
  }

  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

}

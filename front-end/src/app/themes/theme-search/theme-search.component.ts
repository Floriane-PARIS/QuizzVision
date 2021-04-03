import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-search',
  templateUrl: './theme-search.component.html',
  styleUrls: ['./theme-search.component.scss']
})
export class ThemeSearchComponent implements OnInit {
  public themeSubject: string;

  constructor(public themeService: ThemeService) {
    this.themeSubject = '';
  }

  ngOnInit(): void {
  }

  searchThemeSubject(): void {
    const themeToSearch: string = this.themeSubject as string;
    this.themeService.retrieveThemeSubject(themeToSearch);
  }

  annule(): void {
    this.themeService.retrieveThemes();
  }
}

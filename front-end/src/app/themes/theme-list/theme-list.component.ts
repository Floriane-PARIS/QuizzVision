import { Component, OnInit , Input} from '@angular/core';
import {Theme} from '../../../models/Theme.model';
import {Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input()
  theme: Theme;
  public editThemeChose: string;

  public themeList: Theme[] = [];

  constructor(private router: Router, public themeService: ThemeService) {
    this.editThemeChose = '';
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
  }


  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  navigate(): void{
    console.log('event received from child: new quiz');
    if (this.themeService.origin){
      this.router.navigate(['/quiz-form']);
    }
    else {
      this.router.navigate(['/quiz-list']);
    }
  }

  //changes

  editTheme(theme: Theme): void {
    console.log('edit');
    this.editThemeChose = theme.id;
  }

  editThemeDone(theme: Theme): void {
    console.log("doneeee")
    this.themeService.updateTheme(theme);
    this.editThemeChose = '';
  }

}



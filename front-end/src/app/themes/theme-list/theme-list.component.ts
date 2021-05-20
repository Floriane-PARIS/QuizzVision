import { Component, OnInit , Input} from '@angular/core';
import {Theme} from '../../../models/Theme.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';
import {AnimateurService} from '../../../services/animateur.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input()
  theme: Theme;
  public editThemeChose: string;
  public animateurId: string;
  public themeList: Theme[] = [];

  constructor(private router: Router,  private route: ActivatedRoute, public animateurService: AnimateurService, public themeService: ThemeService) {
    this.editThemeChose = '';
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
    this.animateurId = this.route.snapshot.paramMap.get('animateurId');
    this.animateurService.setSelectedAnimateur(this.animateurId);
  }


  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  navigate(): void{
    console.log('event received from child: new quiz' + this.themeService.origin);
    if (this.themeService.origin){
      this.router.navigate(['/' + this.animateurId + '/quiz-form']);
    }
    else {
      this.router.navigate(['/' + this.animateurId + '/quiz-list']);
    }
  }

  editTheme(theme: Theme): void {
    console.log('edit');
    this.editThemeChose = theme.id;
  }

  editThemeDone(theme: Theme): void {
    console.log("doneeee");
    this.themeService.updateTheme(theme);
    this.editThemeChose = '';
  }

}



import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ActivatedRoute} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {
  public theme: Theme;
  public themeSubject: string;

  constructor(private route: ActivatedRoute, private themeService: ThemeService) {
    this.themeService.themeSelected$.subscribe((theme) => this.theme = theme);
    this.themeSubject = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeService.setSelectedTheme(id);
  }

  modifThemeSubject(): void {
    const newName: string = this.themeSubject as string;
    this.themeService.renameTheme(this.theme, newName);
  }
}

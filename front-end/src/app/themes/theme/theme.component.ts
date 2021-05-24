import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  editTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(public themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  select(): void {
    this.themeSelected.emit(this.theme);
  }

  edit(): void {
    this.editTheme.emit(this.theme);
  }

  delete(): void {
    if(confirm('Etes-vous sûr de vouloir supprimer le thème '+ this.theme.subject+' ?')) {
      this.deleteTheme.emit(this.theme);
    }

  }
}






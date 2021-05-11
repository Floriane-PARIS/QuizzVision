import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  //changes
  
  @Input()
  theme: Theme;

  @Output()
  editThemeDone: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(private router: Router, private route: ActivatedRoute, private themeService: ThemeService) {
  }


  ngOnInit(): void {
  }

  edit(): void {
    this.editThemeDone.emit(this.theme);
  }

  retour(): void{
    this.router.navigate(['/theme-list']);
  }

}




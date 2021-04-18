import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  /**
   * ThemeForm: Object which manages the form in our component.
   */
  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService, private router: Router) {
    this.themeForm = this.formBuilder.group({
      subject: ['']
    });
  }

  ngOnInit(): void {
  }

  addTheme(): void {
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    this.themeService.addTheme(themeToCreate);
    this.router.navigate(['/theme-list']);
    
  }

  annule(): void {
    this.router.navigate(['/theme-list']);
  }
}

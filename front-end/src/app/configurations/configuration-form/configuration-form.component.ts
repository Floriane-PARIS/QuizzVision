import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss']
})

export class ConfigurationFormComponent implements OnInit {

  public configurationForm: FormGroup
  constructor(public formBuilder: FormBuilder) {
    this.configurationForm =  this.formBuilder.group({
      bold: [''],
      size: ['']
    });
  }

  ngOnInit(): void {
  }

  addConfiguration(): void {
    //ajouter une configuration
  }
}

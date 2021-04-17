import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationJeuComponent } from './configuration-jeu.component';

describe('ConfigurationJeuComponent', () => {
  let component: ConfigurationJeuComponent;
  let fixture: ComponentFixture<ConfigurationJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationJeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

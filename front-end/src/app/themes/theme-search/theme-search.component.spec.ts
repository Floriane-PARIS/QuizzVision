import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSearchComponent } from './theme-search.component';

describe('ThemeSearchComponent', () => {
  let component: ThemeSearchComponent;
  let fixture: ComponentFixture<ThemeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

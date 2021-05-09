import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Theme} from '../models/Theme.model';
import {THEME_LIST} from '../mocks/theme-list.mock';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /*
   The list of theme.
   The list is retrieved from the mock.
   */
  public themes: Theme[] = THEME_LIST;

  /*
   Observable which contains the list of the theme.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();
  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  retrieveThemeSubject(themeSubject: string): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < themeList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (themeList[i].subject.includes(themeSubject)){
          this.themes.push(themeList[i]);
        }
      }
      this.themes$.next(this.themes);
    });
  }

  retrieveThemeSubject2(themeSubject: string): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < themeList.length; i++){
        // tslint:disable-next-line:triple-equals
        if (themeList[i].subject == themeSubject){
          this.themes.push(themeList[i]);
          console.log(this.themes);
        }
      }
      this.themes$.next(this.themes);
    });
  }

  addTheme(theme: Theme): void {
    let count = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.themes.length; i++){
      if (this.themes[i].subject === theme.subject){
        count ++ ;
      }
    }
    if (count > 0){
      console.log(this.themes);
      document.getElementById('errorname').innerHTML = 'thème exite déjà !';
      this.retrieveThemes();
    }
    else{
      this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.retrieveThemes());
      document.getElementById('errorname').innerHTML = '';
    }
  }

  setSelectedTheme(themeId: string): void {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

  deleteTheme(theme: Theme): void {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  renameTheme(theme: Theme, name: string): void {
    const newTheme = {subject: name, id: theme.id};
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.put<Theme>(urlWithId, newTheme, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  //changes
  updateTheme(theme: Theme): void {
    const themeWrite = { Subject: theme.subject };
    const themeUrl = this.themeUrl + '/' + theme.id ;
    this.http.put<Theme>(themeUrl, themeWrite, this.httpOptions).subscribe();
  }
}

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
  /**
   * The list of theme.
   * The list is retrieved from the mock.
   */
  public themes: Theme[] = THEME_LIST;
  public origin: boolean;

  /**
   * Observable which contains the list of the theme.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: Subject<Theme> = new Subject();
  private themeUrl = serverUrl + '/themes';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveThemes();
    this.origin = false;
  }

  /**
   * retrieve all themes from the back-end
   */
  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  /**
   * retrieve all themes from the back-end with option about the Subject
   * @param themeSubject
   */
  retrieveThemeSubject(themeSubject: string): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < themeList.length; i++){
        // tslint:disable-next-line:triple-equals
        if ((themeList[i].subject.includes(themeSubject) || (themeList[i].subject == themeSubject))){
          this.themes.push(themeList[i]);
        }
      }
      this.themes$.next(this.themes);
    });
  }

  /**
   * add theme in the back-end
   * @param theme
   */
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
      document.getElementById('errorname').innerHTML = 'Ce thème existe déjà !';
      this.retrieveThemes();
    }
    else{
      this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.retrieveThemes());
      document.getElementById('errorname').innerHTML = '';
    }
  }

  /**
   * select theme that we want to observe
   * @param themeId
   */
  setSelectedTheme(themeId: string): void {
    const urlWithId = this.themeUrl + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

  /**
   * delete theme in the back-end
   * @param theme
   */
  deleteTheme(theme: Theme): void {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  /**
   * update theme's name
   * @param theme
   */
  updateTheme(theme: Theme): void {
    const themeWrite = { subject: theme.subject, id: theme.id };
    const themeUrl = this.themeUrl + '/' + theme.id ;
    this.http.put<Theme>(themeUrl, themeWrite, this.httpOptions).subscribe(() => this.retrieveThemes);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Animateur } from 'src/models/animateur.model';
import { ANIMATEUR_LIST } from 'src/mocks/animateur-list.mock';




@Injectable({
  providedIn: 'root'
})
export class AnimateurService {
 
  /*
   The list of animateur.
   */
  //private animateurs: Animateur[] = [];

  /*
   The list of animateurs.
   The list is retrieved from the mock.
   */
   private animateurs: Animateur[] = ANIMATEUR_LIST;
   
  /*
   Observable which contains the list of the animateur.
   */
  public animateurs$: BehaviorSubject<Animateur[]> = new BehaviorSubject([]);
  
  
  public animateurSelected$: Subject<Animateur> = new Subject();
  

  private animateurUrl = serverUrl + '/animateurs';
  

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveAnimateurs();
  }

  retrieveAnimateurs(): void {
    console.log('retrieve');
    this.http.get<Animateur[]>(this.animateurUrl).subscribe((animateurList) => {
      this.animateurs = animateurList;
      this.animateurs$.next(this.animateurs);
    });
    console.log(this.animateurs);
  }


  //changes
  retrieveAnimateurName(animateurFName: string): void {
    this.http.get<Animateur[]>(this.animateurUrl).subscribe((animateurList) => {
      this.animateurs = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < animateurList.length; i++){
        // tslint:disable-next-line:triple-equals
        if ((animateurList[i].name === animateurFName)
        || (animateurList[i].name === animateurFName && '' )
          || ('' === animateurFName)) {
          this.animateurs.push(animateurList[i]);
          console.log(animateurList[i]);
        }
      }
      this.animateurs$.next(this.animateurs);
    });
  }


  updateAnimateur(animateur: Animateur): void {
    const animateurWrite = { name: animateur.name, password: animateur.password, passwordConfirmed: animateur.passwordConfirmed, mail: animateur.mail};
    const animateurUrl = this.animateurUrl + '/' + animateur.id ;
    this.http.put<Animateur>(animateurUrl, animateurWrite, this.httpOptions).subscribe();
  }

  addAnimateur(animateur: Animateur): void {
    this.http.post<Animateur>(this.animateurUrl, animateur, this.httpOptions).subscribe(() => this.retrieveAnimateurs());
  }

  setSelectedAnimateur(animateurId: string): void {
    if (animateurId === undefined) {
      this.animateurSelected$.next(undefined);
    } else {
      const urlWithId = this.animateurUrl + '/' + animateurId;
      this.http.get<Animateur>(urlWithId).subscribe((animateur) => {
        this.animateurSelected$.next(animateur);
      });
    }
  }


}

 
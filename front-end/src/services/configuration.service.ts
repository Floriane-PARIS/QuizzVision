import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Configuration } from '../models/configuration.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  /*
   The list of configuration.
   */
  private configurations: Configuration[] = [];

  /*
   Observable which contains the list of the configuration.
   */
  public configurations$: BehaviorSubject<Configuration[]>
    = new BehaviorSubject([]);

  public configurationSelected$: Subject<Configuration> = new Subject();

  private configurationUrl = serverUrl + '/configurations';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveConfigurations();
  }

  retrieveConfigurations(): void {
    this.http.get<Configuration[]>(this.configurationUrl).subscribe((ConfigurationEdit) => {
      this.configurations = ConfigurationEdit;
      this.configurations$.next(this.configurations);
    });
  }

  addConfiguration(configuration: Configuration): void {
    this.http.post<Configuration>(this.configurationUrl, configuration, this.httpOptions).subscribe(() => this.retrieveConfigurations());
    // this.configurations.push(configuration);
    console.log('configurations before emit ', this.configurations);
    // this.configurations$.next(this.configurations);
  }

  setSelectedConfiguration(configurationId: string): void {
    const urlWithId = this.configurationUrl + '/' + configurationId;
    this.http.get<Configuration>(urlWithId).subscribe((configuration) => {
      this.configurationSelected$.next(configuration);
    });
  }

  deleteConfiguration(configuration: Configuration): void {
    const urlWithId = this.configurationUrl + '/' + configuration.id;
    this.http.delete<Configuration>(urlWithId, this.httpOptions).subscribe(() => this.retrieveConfigurations());
  }
}

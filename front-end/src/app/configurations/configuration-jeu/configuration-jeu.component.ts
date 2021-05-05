import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Configuration} from '../../../models/configuration.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from "../../../services/game.service";
import {QuizService} from "../../../services/quiz.service";
import {Game} from "../../../models/game.model";

@Component({
  selector: 'app-configuration-jeu',
  templateUrl: './configuration-jeu.component.html',
  styleUrls: ['./configuration-jeu.component.scss']
})
export class ConfigurationJeuComponent implements OnInit {

  public user: User;
  public game: Game;
  public configuration: Configuration;
  public root = document.documentElement;
  public configurationForm: FormGroup;
  public size: number;
  public max: number;
  public min: number;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, private userService: UserService, private gameService: GameService, private quizService: QuizService) {
    this.gameService.gameSelected$.subscribe((game) => {
      this.game = game;
    });
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.userService.configurationNext$.subscribe((configuration) => {
        this.configuration = configuration;
        if (this.configuration !== undefined) {
          if (this.configuration.handicap === 'Glaucome'){
            this.max = this.configuration.shift + 1 + (this.configuration.shift * 10 / 100);
            this.min = 0;
            this.size = this.configuration.size;
          }else{
            this.max = 60;
            this.min = 0;
            this.size = 23;
          }
          this.shift();
          this.configurationForm = this.formBuilder.group({
            handicap: [this.configuration.handicap],
            bold: [this.configuration.bold],
            size: [this.configuration.size],
            police: [this.configuration.police],
            bright: [this.configuration.bright],
            contrast: [this.configuration.contrast],
            shift: [this.configuration.shift]
          });
        } else {
          this.configurationForm = this.formBuilder.group({
            handicap: [this.user.maladies],
            bold: ['normal'],
            size: ['22'],
            police: ['Arial'],
            bright: ['100'],
            contrast: ['100'],
            shift: ['60']
          });
        }
      });
    });
    if (this.configurationForm === undefined) {
      this.configurationForm = this.formBuilder.group({
        handicap: ['Glaucome'],
        bold: ['normal'],
        size: ['22'],
        police: ['Arial'],
        bright: ['100'],
        contrast: ['100'],
        shift: ['60']
      });
    }
  }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
    const idGame = this.route.snapshot.paramMap.get('id');
    this.gameService.setSelectedGame(idGame);
  }

  shift(): void {
    const value = this.configuration.shift;
    this.root.style.setProperty('--slider', value.toString());
  }

  backToGame(): void {
    this.quizService.setSelectedQuiz(this.game.quizId);
    this.router.navigate(['/game/' + this.user.id + '/' + this.game.id]);
  }

  getBold(){
    return this.configuration.bold;
  }

  getPolice(){
    return this.configuration.police;
  }

  getSize(){
    return this.configuration.size + 'px';
  }

  getBright(){
    return 'brightness(' + this.configuration.bright + '%)';
  }
  getContrast(){
    return 'contrast(' + this.configuration.contrast + '%)';
  }
  getFiltre(){
    return this.getBright() + ' ' + this.getContrast();
  }
  getShift(){
    return this.configuration.shift;
  }

  addConfiguration(): void {
    // add a configuration
    const configurationToCreate: Configuration = this.configurationForm.getRawValue() as Configuration;
    console.log('[Add]configuration: ', configurationToCreate);
    this.userService.addConfiguration(this.user, configurationToCreate);
  }
}

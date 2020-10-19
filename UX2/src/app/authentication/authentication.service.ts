import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Storage} from "@ionic/storage";

export interface TokenResponse {
    token: string;
    data: {
      roles: string;
      id: string;
    };
}

const ID = 'id';
const USER_ROLES = 'roles';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  tokenResponse: Observable<TokenResponse>;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
  }

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post(`${environment.apiUrl}/login`,
      {email, password},
      {headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
        tap(async (res: TokenResponse) => {
          if (res) {
            await this.storage.set(ID, JSON.stringify(res.data.id));
            await this.storage.set(USER_ROLES, res.data.roles);
            await this.storage.set(TOKEN_KEY, res.token);
            this.isAuthenticated.next(true);
            this.router.navigateByUrl('/users/profile');
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Login Failed',
              message: 'The provided credentials are incorrect',
              buttons: ['OK'],
            });
            await alert.present();
          }
        })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

 async logout() {
     this.isAuthenticated.next(false);
     await this.storage.clear();
     this.router.navigateByUrl('/');
     this.userData.next(null);
     }
}

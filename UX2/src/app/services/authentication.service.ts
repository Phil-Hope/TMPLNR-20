import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlertController, Platform} from "@ionic/angular";
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

const TOKEN_KEY = 'token';
const ID = 'id';
const USER_ROLES = 'roles';

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
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage,
  ) {
  }

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post(`${environment.apiUrl}/login`,
      {email, password}).pipe(
        tap(async (res: TokenResponse) => {
          if (res) {
            await this.storage.set(TOKEN_KEY, res.token);
            await this.storage.set(ID, res.data.id);
            await this.storage.set(USER_ROLES, res.data.roles);
            this.isAuthenticated.next(true);
            this.router.navigateByUrl(`/users/${res.data.id}/profile`);
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Login Failed',
              message: 'The provided credentials are incorrect',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
     this.isAuthenticated.next(false);
     this.storage.remove(TOKEN_KEY);
     this.storage.remove(ID);
     this.storage.remove(USER_ROLES);
     this.router.navigateByUrl('/');
     this.userData.next(null);
     }

}

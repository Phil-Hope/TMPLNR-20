import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AlertController, Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Storage} from "@ionic/storage";
import {User} from "../interfaces/user.interface";
import {UserTrackerError} from "../pages/admin/users/services/user-errors.interface";

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

  login(email: string, password: string): Observable<TokenResponse | UserTrackerError> {
    return this.http.post(`${environment.apiUrl}/login`,
      {email, password}).pipe(
        tap(async (res: TokenResponse) => {
          if (res) {
            await this.storage.set(TOKEN_KEY, res.token);
            await this.storage.set(ID, JSON.stringify(res.data.id));
            await this.storage.set(USER_ROLES, res.data.roles);
            this.isAuthenticated.next(true);
            this.router.navigateByUrl('/users/profile');
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Login Failed',
              message: 'The provided credentials are incorrect',
              buttons: ['OK']
            });
            await alert.present();
          }
        }),
      catchError(err => this.handleHttpError(err))
    );
  }

  register(user: User): Observable<TokenResponse | User | UserTrackerError> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/users`,
      {user},
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      })
      .pipe(
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
    }),
        catchError(err => this.handleHttpError(err))
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


  handleHttpError(error: HttpErrorResponse): Observable<UserTrackerError> {
    const dataError = new UserTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }
}

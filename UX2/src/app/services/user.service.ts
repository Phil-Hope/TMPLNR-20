import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse, HttpUserEvent} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  user: User;
  id: Observable<any>;

  constructor(private http: HttpClient, private localStorage: LocalStorage) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users.json`)
      .pipe(
        tap(user => console.log('Fetched Users')),
        map((data: User[]) => {
          return data;
        }),
        catchError(this.handleError<User[]>('Get all users'))
      );
  }

  userLogin(email: string, password: string): Observable<any> {
   return this.http.post<any>(`${environment.apiUrl}/login`, {email, password},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        }),
        observe: 'response' as 'body',
        withCredentials: true,
      })
      .pipe(
        tap(_ => alert('User Logged In')),
        catchError(this.handleError<any>('User Login'))
      );
  }

  editAdminPrivileges(userID: User): Observable<any> {
    return this.http.put<User>(`${environment.apiUrl}/users/${userID.id}`,
      {userID},
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(
        tap(_ => console.log(`Role Updated for ${userID.firstName} ${userID.lastName}`)),
        catchError(this.handleError<User>(`User update`))
      );
  }

  addUser(firstName: string,
          lastName: string,
          email: string,
          contactNumber: number,
          profilePicture: string,
          wagePerHour: string,
          roles: string,
          password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`,
      {firstName, lastName, email, contactNumber, profilePicture, wagePerHour, roles, password},
      {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), observe: 'response' as 'body',
    })
      .pipe(
        map(user => {
          return user;
        }),
        catchError(this.handleError<any>('Add User'))
      );
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${user.id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(
        tap(_ => alert(`Retrieved user: ${user.firstName} ${user.lastName}`)),
        catchError(this.handleError<User>('Get this user'))
      );
  }

  deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${user.id}`)
      .pipe(
        tap(_ => alert(`User Deleted: ${user.firstName} ${user.lastName}`)),
        catchError(this.handleError<void>('Delete user'))
      );
  }

  editUser(updatedUser: User): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/users/${updatedUser.id}`,
      { updatedUser },
      { headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })})
      .pipe(
        tap(_ => alert(`User updated: ${updatedUser.firstName} ${updatedUser.lastName}`)),
        catchError(this.handleError<void>('Update user'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}


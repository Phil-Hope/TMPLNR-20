import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {User} from "../../../interfaces/user.interface";


@Injectable()
export class UsersService {
  user: Observable<User>;
  users: Observable<User[]>;

  constructor(private http: HttpClient) {
  }

  loadAllUsers(): Observable<User[]> {
    const params = new HttpParams()
      .set('order[firstName]', 'ASC');
    return this.http.get<User[]>(`${environment.apiUrl}/users.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      map((data: User[]) => data),
      tap(_ => console.log('Users Retrieved Successfully!'))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true,
      }).pipe(
      map((data: User) => data),
      tap(_ => console.log(`User with UUID: ${id} Fetched Successfully!`))
    );
  }

  editUser(
    id: string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    email: string,
    password: string,
    profilePicture: string,
    wagePerHour: string
  ): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/`,
      {id, firstName, lastName, contactNumber, email, password, profilePicture, wagePerHour},
      {
        headers: new HttpHeaders({
          'Contact-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      map((data: User) => data),
      tap(_ => alert(`User ${firstName} ${lastName} was Successfully Updated!`))
    );
  }
    deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        tap(_ => alert('User Successfully Deleted!'))
    );
  }

  addUser(
    firstName: string,
    lastName: string,
    contactNumber: string,
    email: string,
    password: string,
    profilePicture: string,
    wagePerHour: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/`,
      {firstName, lastName, contactNumber, email, password, profilePicture, wagePerHour},
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true,
      }).pipe(
        map((data: User) => data),
      tap(_ => alert(`User ${firstName} ${lastName} Created Successfully!`))
    );
  }
}

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {tap} from "rxjs/operators";
import {User} from "../../../../interfaces/user.interface";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {format} from "date-fns";

@Injectable()
export class UsersService {

  user: Observable<User>;
  users: Observable<User[]>;
  date = new Date();

  constructor(
    private http: HttpClient) {
  }

  loadAllUsers(): Observable<User[]> {
    const params = new HttpParams()
      .set('order[firstName]', 'asc');
    return this.http.get<User[]>(`${environment.apiUrl}/users.json`,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('Users Retrieved Successfully!'))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`User with UUID: ${id} Fetched Successfully!`))
    );
  }

  loadAllUsersShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'desc')
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPendingShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'false');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingPendingShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'false');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastPendingShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'false');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersApprovedShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'true');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingApprovedShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'true');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastApprovedShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'true');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPendingPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingPendingPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastPendingPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPendingSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingPendingSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastPendingSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'false')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersApprovedPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingApprovedPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastApprovedPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersApprovedSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingApprovedSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastApprovedSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('isApproved', 'true')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersSecondaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'secondary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersUpcomingPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[after]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPastPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('start[before]', format(this.date, 'yyyy-MM-dd HH:mm:ss'))
      .set('order[start]', 'desc')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  loadUsersPrimaryShifts(id: string): Observable<ScheduledShift[]> {
    const params = new HttpParams()
      .set('order[start]', 'asc')
      .set('ShiftStatus', 'primary');
    return this.http.get<ScheduledShift[]>(`${environment.apiUrl}/users/${id}/shifts.json`,
      {
        params, headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`Shifts Retrieved For User: ${id} `))
    );
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`,
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        roles: user.roles,
        email: user.email,
        wagePerHour: user.wagePerHour
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log(`User ${user.firstName} ${user.lastName} was Successfully Updated!`))
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => console.log('User Successfully Deleted!'))
    );
  }

  resetPassword(id: string, password: string): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`,
      {password},
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json'
          })
      }).pipe(
          tap(_ => console.log('Password reset successfully!'))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register`,
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        wagePerHour: user.wagePerHour
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => alert(`User ${user.firstName} ${user.lastName} Created Successfully!`)),
      tap(data => console.log('register: ' + JSON.stringify(data)))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roles: user.roles,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        wagePerHour: user.wagePerHour
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
      tap(_ => alert(`User ${user.firstName} ${user.lastName} Created Successfully!`)),
      tap(data => console.log('add user: ' + JSON.stringify(data)))
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit {
  user$: User;
  id: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
   this.id = this.route.snapshot.paramMap.get('id');
   this.getUser().subscribe(user => this.user$ = user);
  }

  getUser(): Observable<User> {
  return this.http.get<User>(`${environment.apiUrl}/users/${this.id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        map((data: User) => data)
  );
  }

  viewShiftDetails(): void {
    this.router.navigateByUrl('/shifts/:id/details');
  }
}

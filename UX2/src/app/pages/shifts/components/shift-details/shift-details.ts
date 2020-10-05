import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.html',
  styleUrls: ['./shift-details.scss'],
})
export class ShiftDetailsPage implements OnInit {

  shift: ScheduledShift;
  shift$: Observable<ScheduledShift>;
  date = new Date();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getShift(id);
  }

  getShift(id: string) {
     this.http.get<ScheduledShift>(`${environment.apiUrl}/shifts/${id}.json`,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
        map((data: ScheduledShift) => data)
    );
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../../interfaces/user.interface";


@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.html',
  styleUrls: ['./edit-shift.scss'],
})
export class EditShiftPage implements OnInit {

  id: string;

  users: Observable<User[]>;
  shifts: ScheduledShift[];
  shift: ScheduledShift;

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }



  ngOnInit() {
    this.users = this.http.get<User[]>(`${environment.apiUrl}/users.json`);

    this.id = this.route.snapshot.paramMap.get('id');
    this.getShiftForEdit().subscribe(shift => this.shift = shift);

    this.form = this.fb.group({
      start: '',
      end: '',
      onDuty: '',
      ShiftStatus: '',
      isApproved: [false]
    });
  }

  getShiftForEdit(): Observable<ScheduledShift> {
    return this.http.get<ScheduledShift>(`${environment.apiUrl}/shifts/${this.id}.json`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).pipe(
      map((data: ScheduledShift) => data)
    );
  }

  get f() { return this.form.controls; }

  editShift() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.http.put<ScheduledShift>(`${environment.apiUrl}/shifts/${this.id}`,
      {
        start: this.f.start.value,
        finish: this.f.end.value,
        onDuty: this.f.onDuty.value,
        ShiftStatus: this.f.ShiftStatus.value,
        isApproved: this.f.isApproved.value,
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }), withCredentials: true
      }).subscribe(data => (data));
  }

}

import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../interfaces/user.interface';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {environment} from "../../../../../environments/environment";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.html',
  styleUrls: ['./add-shift.scss'],
})
export class AddShiftPage implements OnInit {

  pageTitle: 'Add Shift';
  submitted = false;
  loading = false;
  shift: ScheduledShift;
  user: Observable<User>;
  users: Observable<User[]>;
  form: FormGroup;

  constructor( private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {

    this.users = this.http.get<User[]>(`${environment.apiUrl}/users.json`);

    this.form = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      onDuty: ['', Validators.required],
      ShiftStatus: ['', Validators.required],
      isApproved: [false, Validators.required]
    });

  }

  get f() { return this.form.controls; }

  addShift() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.http.post<ScheduledShift>(`${environment.apiUrl}/shifts`, {
      start: this.f.start.value,
      end: this.f.end.value,
      onDuty: this.f.onDuty.value,
      ShiftStatus: this.f.ShiftStatus.value,
      isApproved: this.f.isApproved.value,
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
      }
      ).
    pipe(
      tap(_ => alert('New Shift Created Successfully!')))
    .subscribe(data => console.log(data));
  }
  }

import { Component, OnInit } from '@angular/core';
import {ShiftsService} from "../shifts/services/shifts.service";
import {ScheduledShift} from "../../interfaces/shifts.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})

export class AdminPage implements OnInit {

  shifts: ScheduledShift[];
  shift: ScheduledShift;
  form: FormGroup;
  id: string;
  isApproved: boolean;
  submitted = false;
  loading = false;
  date = new Date();

  constructor(
    private shiftService: ShiftsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      isApproved: [true]
    });
  }

  ngOnInit() {


    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }




}

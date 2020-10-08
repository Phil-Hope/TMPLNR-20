import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from "../../../interfaces/shifts.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../admin/users/services/users.service";

@Component({
  selector: 'app-profile-shifts',
  templateUrl: './profile-shifts.page.html',
  styleUrls: ['./profile-shifts.page.scss'],
})
export class ProfileShiftsPage implements OnInit {

  shifts: ScheduledShift[];
  approvedShifts: [];
  pendingShifts: [];
  shift: ScheduledShift;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.loadAllUsersShifts(id).subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

}

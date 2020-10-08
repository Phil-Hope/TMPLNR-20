import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {UsersService} from "../admin/users/services/users.service";
import {ScheduledShift} from "../../interfaces/shifts.interface";
import {UserTrackerError} from "../admin/users/services/user-errors.interface";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit {

  user: User | UserTrackerError;
  users: User[];
  shifts: ScheduledShift[] | UserTrackerError;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {
  }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    }
    catch (e) { console.log(e); }
  }

  async ngOnInit() {
      const value = await this.getStorage();
      this.getUserFromStorage(JSON.parse(value));
      this.getUsersShiftsFromStorage(JSON.parse(value));
  }

  async getUserFromStorage(id: string) {
     this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }

  async getUsersShiftsFromStorage(id: string) {
     this.userService.loadAllUsersShifts(id).subscribe((data: ScheduledShift[]) => this.shifts = data);
  }

  viewShiftDetails(): void {
    this.router.navigateByUrl('/users/:id/shifts');
  }
}

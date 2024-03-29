import {Component, Input, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {Storage} from "@ionic/storage";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../../../interfaces/user.interface";
import {Observable} from "rxjs";
import {ScheduledShift} from "../../../../../interfaces/shifts.interface";

@Component({
  selector: 'app-users-shifts',
  templateUrl: './users-shifts.html',
  styleUrls: ['./users-shifts.scss'],
})

export class UsersShiftsPage implements OnInit {

  userShifts$: Observable<ScheduledShift[]>;
  userShifts: ScheduledShift[];
  date = new Date();
  user: User;
  users: User[];

  constructor(
    private userService: UsersService,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    const id = await this.route.snapshot.paramMap.get('id');
    this.loadUserShifts(id).subscribe((data: ScheduledShift[]) => this.userShifts = data);
    this.loadUser(id).subscribe((data: User) => this.user = data);


    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  loadUser(id: string): Observable<User> {
    return this.userService.getUserById(id);
  }

  loadUsersShifts(id: string) {
    this.userService.loadAllUsersShifts(id)
      .subscribe((data: ScheduledShift[]) => this.userShifts = data);
  }

  loadUserShifts(id: string): Observable<ScheduledShift[]> {
    return this.userService.loadAllUsersShifts(id);
  }
}

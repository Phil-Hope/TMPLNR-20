import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../services/comments.service";
import {ShiftsService} from "../../services/shifts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../../admin/users/services/users.service";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {map} from "rxjs/operators";
import {CommentsTrackerError} from "../../services/comments-errors.provider";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

  form: FormGroup;
  user: User;
  receivers: User[];
  shift: ScheduledShift;
  comment: ShiftComments;
  comments: ShiftComments[] | CommentsTrackerError;
  date = new Date();
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private shiftsService: ShiftsService,
    private fb: FormBuilder,
    private storage: Storage,
    private userService: UsersService,
    private router: Router
  ) { }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    }
    catch (e) { console.log(e); }
  }

  async getUserFromStorage(id: string) {
    await this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }

  async getShiftForComment() {
    const id = await this.route.snapshot.paramMap.get('id');
    await this.shiftsService.getShiftById(id)
      .subscribe((data: ScheduledShift) => this.shift = data);
  }

  async getOtherComments() {
    const id = await this.route.snapshot.paramMap.get('id');
    await this.commentsService.getCommentsForShift(id)
      .subscribe(data => this.comments = data);
  }

 async ngOnInit() {
    const value = await this.getStorage();
    await this.getUserFromStorage(JSON.parse(value));
    this.userService.loadAllUsers().subscribe((data: User[]) => this.receivers = data);

    await this.getOtherComments();
    await this.getShiftForComment();

    this.form = this.fb.group({
      comment: ['', Validators.required],
      shift: ['', Validators.required],
      authoredBy: ['', Validators.required],
      dateOfComment: ['', Validators.required],
      recipient: ['']
    });
  }


  addCommentToShift() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = {...this.comment, ...this.form.value};

        this.loading = true;
        this.commentsService.addComment(f)
          .pipe(
            map((res: ShiftComments) => {
              this.router.navigateByUrl(`/shifts/${this.shift.id}/view-comments`);
          })
          )
          .subscribe(data => console.log(JSON.stringify(data)));
      }
    }
  }

}

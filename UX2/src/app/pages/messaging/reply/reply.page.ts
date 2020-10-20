import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {User} from "../../../interfaces/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {UsersService} from "../../admin/users/services/users.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {

  comment: ShiftComments;
  user: User;
  form: FormGroup;
  date = new Date();
  recipient: User;

  constructor(
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private storage: Storage
  ) {
    this.form = this.fb.group({
      subject: [''],
      comment: ['', Validators.required],
      dateOfComment: ['', Validators.required],
      isPrivate: [true],
      authoredBy: ['', Validators.required],
      recipient: ['', Validators.required]
    });
  }

  async getStorage(): Promise<any> {
    try {
      const result = await this.storage.get('id');
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadUserToSendTo(id);
    const value = await this.getStorage();
    this.getUserFromStorage(JSON.parse(value));
  }

  loadUserToSendTo(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.recipient = data);
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id)
      .subscribe((data: User) => this.user = data);
  }


  onSubmitForm() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = {...this.comment, ...this.form.value};

        this.commentsService.sendMessage(fd)
          .pipe(
            tap(_ => alert("Message Sent!")),
            tap(_ => this.router.navigateByUrl('/messaging'))
          )
          .subscribe(data => console.log(JSON.stringify(data)));
      }
    }
  }
}

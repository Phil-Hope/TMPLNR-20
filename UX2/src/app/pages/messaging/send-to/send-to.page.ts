import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../admin/users/services/users.service";
import {Storage} from "@ionic/storage";
import {User} from "../../../interfaces/user.interface";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-send-to',
  templateUrl: './send-to.page.html',
  styleUrls: ['./send-to.page.scss'],
})
export class SendToPage implements OnInit {

  recipient: User;
  sentFrom: User;
  comment: ShiftComments;
  form: FormGroup;
  date = new Date();

  constructor(
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private storage: Storage
  ) {
    this.form = this.fb.group({
      dateOfComment: [''],
      authoredBy: ['', Validators.required],
      recipient: ['', Validators.required],
      comment: ['', Validators.required],
      isPrivate: [true],
      markedAsRead: [false],
      subject: ['', Validators.required],
      shift: [null]
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

    const sender = await this.storage.get('id');
    this.userService.getUserById(JSON.parse(sender))
      .subscribe((data: User) => this.sentFrom = data);

    const id = await this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id)
      .subscribe((data: User) => this.recipient = data);
  }

  sendUserMessage() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = {...this.comment, ...this.form.value};

        this.commentsService.sendMessage(fd)
          .pipe(
            tap(_ => alert('Message Sent!')),
            tap(_ => this.router.navigateByUrl('/messaging/sent'))
          ).subscribe(() => console.log('Message Sent!'));
      }
    }
  }

}

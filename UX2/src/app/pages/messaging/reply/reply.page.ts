import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../shifts/services/comments.service";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {User} from "../../../interfaces/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";

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
  recipient: string;
  constructor(
    private commentsService: CommentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.fb.group({
      subject: [''],
      comment: ['', Validators.required],
      dateOfComment: [this.date],
      isPrivate: ['', Validators.required],
      authoredBy: ['', Validators.required],
      recipient: [this.recipient]
    });
  }

  ngOnInit() {
    this.recipient = this.route.snapshot.paramMap.get('id');
  }

  onSubmitForm() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = { ...this.comment, ...this.form.value };

        this.commentsService.addComment(fd)
          .pipe(
            tap(_ => alert("Message Sent!")),
            tap(_ => this.router.navigateByUrl('/messaging'))
          )
          .subscribe(data => console.log(JSON.stringify(data)));
      }
    }
  }

}

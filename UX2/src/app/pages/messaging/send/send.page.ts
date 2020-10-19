import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentsService} from "../../shifts/services/comments.service";
import {UsersService} from "../../admin/users/services/users.service";
import {Router} from "@angular/router";
import {User} from "../../../interfaces/user.interface";
import {Storage} from "@ionic/storage";
import {ShiftComments} from "../../../interfaces/shift-comments.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  users: User[];
  user: User;
  form: FormGroup;
  comment: ShiftComments;
  date = new Date();

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private usersService: UsersService,
    private router: Router,
    private storage: Storage
  ) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      comment: ['', Validators.required],
      authoredBy: [''],
      recipient: ['', Validators.required],
      dateOfComment: [this.date],
      isPrivate: [true]
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
    const value = await this.getStorage();
    this.getUserFromStorage(JSON.parse(value));
    this.loadUserToSelect();
  }

  loadUserToSelect(){
    this.usersService.loadAllUsers().subscribe((data: User[]) => this.users = data);
  }

  async getUserFromStorage(id: string) {
    this.usersService.getUserById(id).subscribe((data: User) => this.user = data);
  }

  onSendMessage() {
    if (this.form.valid) {
      if (this.form.dirty) {
        const fd = { ...this.comment, ...this.form.value };
        this.commentsService.sendMessage(fd)
          .pipe(
            tap(_ => alert('Message Sent!')),
            tap(_ => this.router.navigateByUrl('/messaging'))
          ).subscribe(data => console.log(JSON.stringify(data)));
      }
    }
  }
}

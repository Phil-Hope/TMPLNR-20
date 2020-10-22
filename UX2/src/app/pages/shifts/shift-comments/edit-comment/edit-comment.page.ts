import { Component, OnInit } from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {User} from "../../../../interfaces/user.interface";
import {UsersService} from "../../../admin/users/services/users.service";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.page.html',
  styleUrls: ['./edit-comment.page.scss'],
})
export class EditCommentPage implements OnInit {

  comment: ShiftComments;
  form: FormGroup;
  user: User;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storage: Storage,
    private userService: UsersService
    ) {
    this.form = this.fb.group({
      authoredBy: ['', Validators.required],
      shift: [''],
      comment: ['', Validators.required],
      dateOfComment: ['', Validators.required],
      recipient: ['']
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
    this.commentsService.getCommentById(id)
      .subscribe((data: ShiftComments) => this.comment = data);
    const value = await this.getStorage();
    this.getUserFromStorage(JSON.parse(value));
  }
  onEditComment(){
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = { ...this.comment, ...this.form };
        this.commentsService.editComment(f)
          .subscribe(data => console.log(JSON.stringify(data))
        );
      }
    }
  }

  async getUserFromStorage(id: string) {
    this.userService.getUserById(id).subscribe((data: User) => this.user = data);
  }
}

import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {map, tap} from "rxjs/operators";

@Component({
    selector: 'app-delete-comment',
    templateUrl: './delete-comment.page.html',
    styleUrls: ['./delete-comment.page.scss'],
})
export class DeleteCommentPage implements OnInit {

    comment: ShiftComments;
    form: FormGroup;
    id = '';
    isSubmitted = false;
    constructor(
        private commentService: CommentsService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
    ) {
    }

    ngOnInit() {
         const id = this.route.snapshot.paramMap.get('id');
         this.commentService.getCommentById(id)
            .subscribe((data: ShiftComments) => this.comment = data);

         this.form = this.fb.group({
            id: ['']
        });
    }

    deleteComment() {
        this.isSubmitted = true;
        if (this.form.valid) {
            const f = { ...this.comment, ...this.form.value };
            this.commentService.deleteComment(f)
                .pipe(
                    tap(_ => alert('Comment deleted:' + JSON.stringify(_))),
                    map(_ => this.router.navigateByUrl('/comments'))
                ).subscribe(data => data);
        }
    }
}

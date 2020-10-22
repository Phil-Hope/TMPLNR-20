import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {ShiftComments} from "../../../../interfaces/shift-comments.interface";
import {AlertController} from "@ionic/angular";
import {tap} from "rxjs/operators";
import {ShiftsService} from "../../services/shifts.service";
import {ScheduledShift} from "../../../../interfaces/shifts.interface";

@Component({
  selector: 'app-shift-comments',
  templateUrl: './shift-comments.page.html',
  styleUrls: ['./shift-comments.page.scss'],
})
export class ShiftCommentsPage implements OnInit {

  comments: ShiftComments[];
  shift: ScheduledShift;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private shiftsService: ShiftsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getShiftComments(id);
    this.getShift(id);
  }

  getShiftComments(id: string) {
    this.commentsService.getCommentsForShift(id)
      .pipe(
        tap(async (res) => {
          if (res.length === 0) {
          const alert = await this.alertCtrl.create({
            header: 'No shift-comments found!',
            buttons: ['Dismiss']
          });
          await alert.present();
        }})
      ).subscribe((data: ShiftComments[]) => this.comments = data);
  }
  getShift(id: string) {
    this.shiftsService.getShiftById(id).subscribe((data: ScheduledShift) => this.shift = data);
  }

}

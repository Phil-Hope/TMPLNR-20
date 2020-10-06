import {Component, OnInit} from '@angular/core';
import {ScheduledShift} from '../../../../interfaces/shifts.interface';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShiftsService} from "../../services/shifts.service";

@Component({
    selector: 'app-delete-shift',
    templateUrl: './delete-shift.html',
    styleUrls: ['./delete-shift.scss'],
})
export class DeleteShiftPage implements OnInit {

    shift: ScheduledShift;
    form: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shiftService: ShiftsService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: ['', Validators.required]
        });
        const id = this.route.snapshot.paramMap.get('id');
        this.shiftService.getShiftById(id).subscribe(data => this.shift = data);
    }
    get f() { return this.form.controls; }

    submitDeleteShift() {
        this.shiftService.deleteShift(this.f.id.value).subscribe(data => console.log(data));
    }

}

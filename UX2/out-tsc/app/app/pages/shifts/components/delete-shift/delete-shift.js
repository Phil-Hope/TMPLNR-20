import { __decorate } from "tslib";
import { Component } from '@angular/core';
var DeleteShiftPage = /** @class */ (function () {
    function DeleteShiftPage(route, router, 
    //   private shiftService: ShiftService,
    fb) {
        this.route = route;
        this.router = router;
        this.fb = fb;
    }
    DeleteShiftPage.prototype.ngOnInit = function () {
        //    const shiftId = this.route.snapshot.paramMap.get('id');
        //    this.shift$ = this.shiftService.findShiftById(shiftId);
    };
    DeleteShiftPage.prototype.goToShift = function (shift) {
        var shiftId = shift ? shift.id : null;
        this.router.navigate(['delete/', { id: shiftId }]).then(function (r) { });
    };
    DeleteShiftPage = __decorate([
        Component({
            selector: 'app-delete-shift',
            templateUrl: './delete-shift.html',
            styleUrls: ['./delete-shift.scss'],
        })
    ], DeleteShiftPage);
    return DeleteShiftPage;
}());
export { DeleteShiftPage };
//# sourceMappingURL=delete-shift.js.map
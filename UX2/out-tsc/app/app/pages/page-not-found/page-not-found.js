import { __decorate } from "tslib";
import { Component } from '@angular/core';
var PageNotFoundPage = /** @class */ (function () {
    function PageNotFoundPage(router) {
        this.router = router;
    }
    PageNotFoundPage.prototype.ngOnInit = function () { };
    PageNotFoundPage.prototype.returnHome = function () {
        this.router.navigateByUrl('/home');
    };
    PageNotFoundPage = __decorate([
        Component({
            selector: 'app-page-not-found',
            templateUrl: './page-not-found.html',
            styleUrls: ['./page-not-found.scss'],
        })
    ], PageNotFoundPage);
    return PageNotFoundPage;
}());
export { PageNotFoundPage };
//# sourceMappingURL=page-not-found.js.map
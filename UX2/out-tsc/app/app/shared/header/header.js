import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
var Header = /** @class */ (function () {
    function Header() {
        this.logoUrl = 'https://media.publit.io/file/TMPLNR-2020.png';
        this.headerBanner = 'https://media.publit.io/file/header-D.png';
    }
    Header.prototype.ngOnInit = function () { };
    __decorate([
        Input()
    ], Header.prototype, "pageTitle", void 0);
    Header = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.html',
            styleUrls: ['./header.scss'],
        })
    ], Header);
    return Header;
}());
export { Header };
//# sourceMappingURL=header.js.map
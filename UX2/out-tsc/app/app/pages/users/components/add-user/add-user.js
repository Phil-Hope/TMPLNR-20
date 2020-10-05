import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from "../../../../../environments/environment";
var AddUserPage = /** @class */ (function () {
    function AddUserPage(http, fb) {
        this.http = http;
        this.fb = fb;
        this.pageTitle = 'Add Employee';
        this.submitted = false;
        this.loading = false;
    }
    AddUserPage.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            contactNumber: ['', Validators.required],
            wagePerHour: ['', Validators.required],
            profilePicture: [''],
            roles: this.fb.array([]),
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    Object.defineProperty(AddUserPage.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    AddUserPage.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        else {
            this.http.post(environment.apiUrl + "/shifts", {
                firstName: this.f.firstName.value,
                lastName: this.f.lastName.value,
                contactNumber: this.f.contactNumber.value,
                wagePerHour: this.f.wagePerHour.value,
                profilePicture: this.f.profilePicture.value,
                roles: this.f.roles.value,
                email: this.f.email.value,
                password: this.f.password.value
            });
        }
    };
    AddUserPage = __decorate([
        Component({
            selector: 'app-add-user',
            templateUrl: './add-user.html',
            styleUrls: ['./add-user.scss'],
        })
    ], AddUserPage);
    return AddUserPage;
}());
export { AddUserPage };
//# sourceMappingURL=add-user.js.map
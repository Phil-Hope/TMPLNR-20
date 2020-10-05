import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
var RegisterPage = /** @class */ (function () {
    function RegisterPage(http, fb, alert) {
        this.http = http;
        this.fb = fb;
        this.alert = alert;
        this.pageTitle = 'Register';
        this.loading = false;
        this.submitted = false;
    }
    RegisterPage.prototype.MustMatch = function (controlName, matchingControlName) {
        return function (formGroup) {
            var control = formGroup.controls[controlName];
            var matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    };
    RegisterPage.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            contactNumber: ['', Validators.required],
            profilePicture: [''],
            wagePerHour: ['0.00'],
            roles: this.fb.array(['ROLE_USER', 'ROLE_ADMIN']),
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    };
    Object.defineProperty(RegisterPage.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    RegisterPage.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.http.post(environment.apiUrl + "/users", {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            email: this.f.email.value,
            contactNumber: this.f.contactNumber.value,
            profilePicture: this.f.profilePicture.value,
            wagePerHour: this.f.wagePerHour.value,
            roles: this.f.roles.value,
            password: this.f.password.value
        }).pipe(first()).subscribe();
    };
    RegisterPage = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.html',
            styleUrls: ['./register.scss'],
        })
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map
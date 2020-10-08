import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { WelcomeGuard } from "./guards/welcome.guard";
import { AutoLoginGuard } from "./guards/auto-login.guard";
import { AuthGuard } from "./guards/auth.guard";
var routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: function () { return import('./pages/welcome/welcome.module').then(function (m) { return m.WelcomeModule; }); }
    },
    {
        path: 'home',
        loadChildren: function () { return import('./pages/home/home.module').then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: 'login',
        loadChildren: function () { return import('./pages/login/login.module').then(function (m) { return m.LoginModule; }); },
        canLoad: [WelcomeGuard, AutoLoginGuard]
    },
    {
        path: 'register',
        loadChildren: function () { return import('./pages/register/register.module').then(function (m) { return m.RegisterModule; }); },
        canLoad: [WelcomeGuard, AutoLoginGuard]
    },
    {
        path: 'contact',
        loadChildren: function () { return import('./pages/home/components/contact/contact.module').then(function (m) { return m.ContactModule; }); }
    },
    {
        path: 'shifts',
        loadChildren: function () { return import('./pages/shifts/components/list-shifts/list-shifts.module').then(function (m) { return m.ListShiftsModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'shifts/add',
        loadChildren: function () { return import('./pages/shifts/components/add-shift/add-shift.module').then(function (m) { return m.AddShiftModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'shifts/draft-calendar',
        loadChildren: function () { return import('./pages/shifts/components/calendar/calendar.module').then(function (m) { return m.CalendarPageModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'shifts/:id/details',
        loadChildren: function () { return import('./pages/shifts/components/shift-details/shift-details.module').then(function (m) { return m.ShiftDetailsModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'shifts/:id/edit',
        loadChildren: function () { return import('./pages/shifts/components/edit-shift/edit-shift.module').then(function (m) { return m.EditShiftPageModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'shifts/:id/delete',
        loadChildren: function () { return import('./pages/shifts/components/delete-shift/delete-shift.module').then(function (m) { return m.DeleteShiftPageModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: function () { return import('./pages/users/components/list-users/list-users.module').then(function (m) { return m.ListUsersModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users/add',
        loadChildren: function () { return import('./pages/users/components/add-user/add-user.module').then(function (m) { return m.AddUserModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users/:id/details',
        loadChildren: function () { return import('./pages/users/components/user-details/user-details.module').then(function (m) { return m.UserDetailsModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users/:id/profile',
        loadChildren: function () { return import('./pages/users/components/profile/profile.module').then(function (m) { return m.ProfileModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users/:id/edit',
        loadChildren: function () { return import('./pages/users/components/edit-user/edit-user.module').then(function (m) { return m.EditUserPageModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: 'users/:id/delete',
        loadChildren: function () { return import('./pages/users/components/delete-user/delete-user.module').then(function (m) { return m.DeleteUserPageModule; }); },
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        loadChildren: function () { return import('./pages/page-not-found/page-not-found.module').then(function (m) { return m.PageNotFoundModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map

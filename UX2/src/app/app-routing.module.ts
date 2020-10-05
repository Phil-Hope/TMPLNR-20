import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WelcomeGuard} from "./guards/welcome.guard";
import {AutoLoginGuard} from "./guards/auto-login.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import ('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/home/components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'shifts',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-shifts.module').then(m => m.ListShiftsModule),
  },
  {
    path: 'shifts/add',
    loadChildren: () => import('./pages/shifts/components/add-shift/add-shift.module').then(m => m.AddShiftModule),
  },
  {
    path: 'shifts/calendar',
    loadChildren: () => import('./pages/shifts/components/calendar/calendar.module').then(m => m.CalendarPageModule),
  },
  {
    path: 'shifts/:id/details',
    loadChildren: () => import('./pages/shifts/components/shift-details/shift-details.module').then(m => m.ShiftDetailsModule),

  },
  {
    path: 'shifts/:id/edit',
    loadChildren: () => import('./pages/shifts/components/edit-shift/edit-shift.module').then(m => m.EditShiftPageModule),

  },
  {
    path: 'shifts/:id/delete',
    loadChildren: () => import('./pages/shifts/components/delete-shift/delete-shift.module').then(m => m.DeleteShiftPageModule),

  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/components/list-users/list-users.module').then(m => m.ListUsersModule),

  },
  {
    path: 'users/add',
    loadChildren: () => import('./pages/users/components/add-user/add-user.module').then(m => m.AddUserModule),

  },
  {
    path: 'users/:id/details',
    loadChildren: () => import('./pages/users/components/user-details/user-details.module').then(m => m.UserDetailsModule),
  },
  {
    path: 'users/:id/profile',
    loadChildren: () => import('./pages/users/components/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'users/:id/edit',
    loadChildren: () => import('./pages/users/components/edit-user/edit-user.module').then(m => m.EditUserPageModule),
  },
  {
    path: 'users/:id/delete',
    loadChildren: () => import('./pages/users/components/delete-user/delete-user.module').then(m => m.DeleteUserPageModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module')
      .then(m => m.WelcomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import ('./pages/home/home.module')
      .then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module')
      .then(m => m.RegisterModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module')
      .then(m => m.AdminPageModule),
  },
  {
    path: 'admin/pending-shifts',
    loadChildren: () => import('./pages/admin/shifts/pending-approval-shifts/pending-approval-shifts.module')
      .then(m => m.PendingApprovalShiftsModule)
  },
  {
    path: 'admin/approve-shift/:id',
    loadChildren: () => import('./pages/admin/shifts/approve-shift/approve-shift.module')
      .then(m => m.ApproveShiftModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/home/components/contact/contact.module')
      .then(m => m.ContactModule)
  },
  {
    path: 'shifts',
    loadChildren: () => import('./pages/shifts/container/shifts-container.module').then(m => m.ContainerPageModule)
  },
  {
    path: 'shifts/:id/details',
    loadChildren: () => import('./pages/shifts/components/shift-details/shift-details.module')
      .then(m => m.ShiftDetailsModule),

  },
  {
    path: 'shifts/:id/edit',
    loadChildren: () => import('./pages/shifts/components/edit-shift/edit-shift.module')
      .then(m => m.EditShiftPageModule),

  },
  {
    path: 'shifts/:id/delete',
    loadChildren: () => import('./pages/shifts/components/delete-shift/delete-shift.module')
      .then(m => m.DeleteShiftPageModule),
  },
  {
    path: 'shifts/add',
    loadChildren: () => import('./pages/shifts/components/add-shift/add-shift.module')
      .then(m => m.AddShiftModule),
  },
  {
    path: 'shifts/list/upcoming',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-upcoming-shifts/list-shifts.module')
      .then(m => m.ListShiftsModule),

  },
  {
    path: 'shifts/list/pending',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-pending-shifts/list-pending-shifts.module')
      .then( m => m.ListPendingShiftsPageModule)
  },
  {
    path: 'shifts/list/approved',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-approved-shifts/list-approved-shifts.module')
      .then( m => m.ListApprovedShiftsPageModule)
  },
  {
    path: 'shifts/list/past',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-past-shifts/list-past-shifts.module')
      .then( m => m.ListPastShiftsPageModule)
  },
  {
    path: 'shifts/list/approved/primary',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-approved-primary-shifts/list-approved-primary-shifts.module')
      .then( m => m.ListApprovedPrimaryShiftsPageModule)
  },
  {
    path: 'shifts/list/approved/secondary',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-approved-secondary-shifts/list-approved-secondary-shifts.module')
      .then( m => m.ListApprovedSecondaryShiftsPageModule)
  },
  {
    path: 'shifts/list/pending/secondary',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-pending-secondary-shifts/list-pending-secondary-shifts.module')
      .then( m => m.ListPendingSecondaryShiftsPageModule)
  },
  {
    path: 'shifts/list/pending/primary',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-pending-primary-shifts/list-pending-primary-shifts.module')
      .then( m => m.ListPendingPrimaryShiftsPageModule)
  },
  {
    path: 'shifts/calendar/draft',
    loadChildren: () => import('./pages/shifts/components/draft-calendar/draft-calendar.module')
      .then(m => m.CalendarPageModule),
  },
  {
    path: 'shifts/calendar/approved',
    loadChildren: () => import('./pages/shifts/components/approved-calendar/approved-calendar.module')
      .then(m => m.ApprovedCalendarPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin/users/components/list-users/list-users.module')
      .then(m => m.ListUsersModule),
  },
  {
    path: 'users/add',
    loadChildren: () => import('./pages/admin/users/components/add-user/add-user.module')
      .then(m => m.AddUserModule),
  },
  {
    path: 'users/:id/shifts',
    loadChildren: () => import('./pages/admin/users/components/users-shifts/users-shifts.module')
      .then(m => m.UsersShiftsModule),
  },
  {
    path: 'users/:id/details',
    loadChildren: () => import('./pages/admin/users/components/user-details/user-details.module')
      .then(m => m.UserDetailsModule),
  },
  {
    path: 'users/:id/edit',
    loadChildren: () => import('./pages/admin/users/components/edit-user/edit-user.module')
      .then(m => m.EditUserPageModule),
  },
  {
    path: 'users/:id/delete',
    loadChildren: () => import('./pages/admin/users/components/delete-user/delete-user.module')
      .then(m => m.DeleteUserPageModule),
  },
  {
    path: 'users/profile',
    loadChildren: () => import('./pages/profile/profile.module')
      .then(m => m.ProfileModule),
  },
  {
    path: 'users/profile/:id/shifts',
    loadChildren: () => import('./pages/profile/profile-shifts/profile-shifts.module')
      .then( m => m.ProfileShiftsPageModule)
  },
  {
    path: 'users/profile/:id/user',
    loadChildren: () => import('./pages/profile/profile-user/profile-user.module')
      .then( m => m.ProfileUserPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

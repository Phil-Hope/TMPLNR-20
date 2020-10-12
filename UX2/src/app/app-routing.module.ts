import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module')
      .then(m => m.WelcomeModule),
    data: { preload: true }
  },
  {
    path: 'home',
    loadChildren: () => import ('./pages/home/home.module')
      .then(m => m.HomePageModule),
    data: { preload: true }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule),
    data: { preload: true }
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
      .then(m => m.ContactModule),
    data: { preload: true }
  },
  {
    path: 'shifts',
    loadChildren: () => import('./pages/shifts/container/shifts-container.module')
      .then(m => m.ContainerPageModule)
  },
  {
    path: 'shifts/add',
    loadChildren: () => import('./pages/shifts/components/add-shift/add-shift.module')
        .then(m => m.AddShiftModule),
  },
  {
    path: 'shifts/list',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-shifts/list-shifts.module')
        .then(m => m.ListShiftsModule),
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
    path: 'shifts/:id/view-comments',
    loadChildren: () => import('./pages/shifts/comments/shift-comments/shift-comments.module')
      .then( m => m.ShiftCommentsPageModule)
  },
  {
    path: 'shifts/:id/add-comment',
    loadChildren: () => import('./pages/shifts/comments/add-comment/add-comment.module')
      .then( m => m.AddCommentPageModule)
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
    path: 'comments',
    loadChildren: () => import('./pages/shifts/comments/list-comments/list-comments.module')
      .then( m => m.ListCommentsPageModule)
  },
  {
    path: 'comments/:id/view',
    loadChildren: () => import('./pages/shifts/comments/view-comment/view-comment.module')
      .then( m => m.ViewCommentPageModule)
  },
  {
    path: 'comments/:id/edit',
    loadChildren: () => import('./pages/shifts/comments/edit-comment/edit-comment.module')
      .then( m => m.EditCommentPageModule)
  },
  {
    path: 'comments/:id/delete',
    loadChildren: () => import('./pages/shifts/comments/delete-comment/delete-comment.module')
      .then( m => m.DeleteCommentPageModule)
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
    path: 'users/:id/comments',
    loadChildren: () => import('./pages/shifts/comments/user-comments/user-comments.module')
      .then( m => m.UserCommentsPageModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuardGuard} from "./authentication/admin-guard.guard";
import {AuthGuard} from "./guards/auth.guard";

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
  },
  {
    path: 'home',
    loadChildren: () => import ('./pages/home/home.module')
      .then(m => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module')
      .then(m => m.AdminPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/comments',
    loadChildren: () => import('./pages/admin/comments/comments.module')
      .then( m => m.CommentsPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/comments/read/:id',
    loadChildren: () => import('./pages/admin/comments/read/read.module')
      .then( m => m.ReadPageModule)
  },
  {
    path: 'admin/comments/delete/:id',
    loadChildren: () => import('./pages/admin/comments/delete/delete.module')
      .then( m => m.DeletePageModule)
  },
  {
    path: 'admin/shifts/add',
    loadChildren: () => import('./pages/admin/shifts/add/add.module')
      .then( m => m.AddPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/shifts/list',
    loadChildren: () => import('./pages/admin/shifts/shifts-list/list-shifts.module')
      .then(m => m.ListShiftsModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/shifts/approve/:id',
    loadChildren: () => import('./pages/admin/shifts/approve-shift/approve-shift.module')
      .then(m => m.ApproveShiftModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/shifts/edit/:id',
    loadChildren: () => import('./pages/admin/shifts/edit/edit.module')
      .then( m => m.EditPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/shifts/details/:id',
    loadChildren: () => import('./pages/admin/shifts/details/details.module')
      .then( m => m.DetailsPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'admin/shifts/delete/:id',
    loadChildren: () => import('./pages/admin/shifts/delete/delete.module')
      .then( m => m.DeletePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/home/components/contact/contact.module')
      .then(m => m.ContactModule)
  },
  {
    path: 'shifts',
    loadChildren: () => import('./pages/shifts/container/shifts-container.module')
      .then(m => m.ContainerPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/add',
    loadChildren: () => import('./pages/shifts/components/add-shift/add-shift.module')
        .then(m => m.AddShiftModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/list',
    loadChildren: () => import('./pages/shifts/components/list-shifts/list-shifts/list-shifts.module')
        .then(m => m.ListShiftsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/:id/details',
    loadChildren: () => import('./pages/shifts/components/shift-details/shift-details.module')
      .then(m => m.ShiftDetailsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/:id/on-duty',
    loadChildren: () => import('./pages/shifts/components/on-duty/on-duty.module')
      .then( m => m.OnDutyPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/:id/comments/view',
    loadChildren: () => import('./pages/shifts/shift-comments/shift-comments/shift-comments.module')
      .then( m => m.ShiftCommentsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/:id/comments/add',
    loadChildren: () => import('./pages/shifts/shift-comments/add-comment/add-comment.module')
      .then( m => m.AddCommentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/calendar/draft',
    loadChildren: () => import('./pages/shifts/components/draft-calendar/draft-calendar.module')
      .then(m => m.CalendarPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'shifts/calendar/approved',
    loadChildren: () => import('./pages/shifts/components/calendar/calendar.module')
      .then(m => m.ApprovedCalendarPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging',
    loadChildren: () => import('./pages/messaging/messaging.module')
      .then( m => m.MessagingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging/send',
    loadChildren: () => import('./pages/messaging/send/send.module')
      .then( m => m.SendPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging/sent',
    loadChildren: () => import('./pages/messaging/sent/sent.module')
      .then( m => m.SentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging/inbox',
    loadChildren: () => import('./pages/messaging/inbox/inbox.module')
      .then( m => m.InboxPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging/:id/reply',
    loadChildren: () => import('./pages/messaging/reply/reply.module')
      .then( m => m.ReplyPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'messaging/:id/send-to',
    loadChildren: () => import('./pages/messaging/send-to/send-to.module')
      .then( m => m.SendToPageModule)
  },
  {
    path: 'messaging/:id/read',
    loadChildren: () => import('./pages/messaging/read/read.module')
      .then( m => m.ReadPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'comments',
    loadChildren: () => import('./pages/shifts/shift-comments/list-comments/list-comments.module')
      .then( m => m.ListCommentsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'comments/:id/view',
    loadChildren: () => import('./pages/shifts/shift-comments/view-comment/view-comment.module')
      .then( m => m.ViewCommentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'comments/:id/edit',
    loadChildren: () => import('./pages/shifts/shift-comments/edit-comment/edit-comment.module')
      .then( m => m.EditCommentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'comments/:id/delete',
    loadChildren: () => import('./pages/shifts/shift-comments/delete-comment/delete-comment.module')
      .then( m => m.DeleteCommentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin/users/components/list-users/list-users.module')
      .then(m => m.ListUsersModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/add',
    loadChildren: () => import('./pages/admin/users/components/add-user/add-user.module')
      .then(m => m.AddUserModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/shifts',
    loadChildren: () => import('./pages/admin/users/components/users-shifts/users-shifts.module')
      .then(m => m.UsersShiftsModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/details',
    loadChildren: () => import('./pages/admin/users/components/user-details/user-details.module')
      .then(m => m.UserDetailsModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/edit',
    loadChildren: () => import('./pages/admin/users/components/edit-user/edit-user.module')
      .then(m => m.EditUserPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/delete',
    loadChildren: () => import('./pages/admin/users/components/delete-user/delete-user.module')
      .then(m => m.DeleteUserPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/shift-comments',
    loadChildren: () => import('./pages/shifts/shift-comments/user-comments/user-comments.module')
      .then( m => m.UserCommentsPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/:id/reset-password',
    loadChildren: () => import('./pages/profile/reset-password/reset-password.module')
      .then( m => m.ResetPasswordPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users/profile',
    loadChildren: () => import('./pages/profile/profile.module')
      .then(m => m.ProfileModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/profile/:id/shifts',
    loadChildren: () => import('./pages/profile/profile-shifts/profile-shifts.module')
      .then( m => m.ProfileShiftsPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: 'users/profile/shifts/:id/delete',
    loadChildren: () => import('./pages/profile/profile-shifts/delete/delete.module')
      .then( m => m.DeletePageModule)
  },
  {
    path: 'users/profile/shifts/:id/edit',
    loadChildren: () => import('./pages/profile/profile-shifts/edit/edit.module')
      .then( m => m.EditPageModule)
  },
  {
    path: 'users/profile/:id/user',
    loadChildren: () => import('./pages/profile/profile-user/profile-user.module')
      .then( m => m.ProfileUserPageModule),
    canLoad: [AdminGuardGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

# ![TMPLNR LOGO](src/assets/icons/icon-96x96.png)  UX Cluster / Project Implementation Cluster

###Symfony WebService + Ionic-Angular Rostering PWA. 

Upon the event of a successful login, you will be redirected to your profile page.
After logging in the application has saved the JWT sent from the webservice. This has been saved
in either the IndexedDB on your browser or in Web SQL.
In the JWT payload, you will find the users uuid, roles and the RS256 encoded token.

I have included the roles and uuid in the JWT payload to fetch the uuid from storage each time 
the user visits their profile page. This was an easier method then the alternative of passing
the uuid in every route parameter. The roles are checked asynchronously in the app.component.ts file and will display 
the relevant menu items depending on whether they are ROLE_USER or ROLE_ADMIN.

For the users that are granted ROLE_USER, they are only able to add shifts for themselves.
And can only edit their own shifts also (only if the shift has not been approved).
This is contrary for users with ROLE_ADMIN who have the ability to assign shifts to any user.
Also, approve shifts and edit all shifts regardless of whether it is approved.

As an added feature to assist teams with collaborating the arrangement of scheduling 
shifts, I have added private messaging. This will allow users to reach out to their peers
and organise the swapping of a shift or any other shift related topics. 

Originally I had only intended to add the ability to add comments on shifts. That ability 
is still an included feature and is another great way for team members to clearly communicate
any shift related matters.

When a user sends a message, their uuid is taken from local storage and prefills the form
with them as the sender of the message. When using the private messaging as opposed to 
shift comments they are given the value of true for the boolean isPrivate. This give users 
the ability to still link a shift with their message and will not become visible when viewing
shift comments.

Admin have the ability to view all communication between users to ensure nothing inappropriate
is being sent between colleagues. 

I have tried to make navigating the app a great experience by adding links to the visible 
information rendered on the screen. Hopefully this provides a seamless experience for the users
when navigating the app and scheduling their shifts.

I have added two separate calendars to the app. One will display the shifts that have not yet
been approved, and the other displays all approved shifts. My logic behind this was to provide 
a good visual tool which display the unfilled time slots in the draft calendar. Then once these
were all filled and the applicable admin user was happy with the scheduling. It is as easy as
clicking on the shift on the calendar and from there the admin user can edit the shift if needed, 
and then approving the shift.

All of the Http calls are located in folders called services. There can be found in:

- `src/app/pages/shifts/services/comments.service.ts`
- `src/app/pages/shifts/services/shifts.service.ts`
- `src/app/pages/admin/users/services/users.service.ts`

To include the JWT in each request I have utilized an interceptor.

it can be found in:

- `src/app/services/http.interceptor.ts`

It listens for any HttpRequest event and then takes the token from the IndexedDB and includes it
in the headers.
If the token expires after the user did not logout correctly, I have added an alert controller
which notifies the user that the token is invalid, then clears the token from the users browser and redirects
them to the login screen to re-authenticate.

Throughout the application I have taken advantage of the angular ngIf and ngFor.
It provides easy manipulation of any json that is given in the http response body.
Such as, if the shift.ShiftStatus === "primary" I can display a nice icon instead of only the value.
With the ngFor, it allows me to iterate through an array of json data. Another great use of ngIf
was in tandom with ngFor, if one of the values in the json was null then the entire html element would not display
rather then leaving an ugly blank area on the page.

All of the routes are found in:

`src/app/app-routing.module.ts`

There about 50 routes used in this file. All of them lazy load the module belonging to 
that page. My reasoning for having a module for every page over multiple components was
due to not having to worry about HTML DOM tree with each route. They are all called from 
the root of the app. Also, because of the size of the app after it kept growing, the initial
load time became too long. This way, rather than the entire app loading, each module is loaded individually when 
the user visits it. Initially, some pages are preloaded like the login page and home page.

To protect the pages from just being accessed when pointing to them in the URL,
I have added an AuthGuard and an AdminGuard.

These work asynchronously and listen for when a JWT becomes stored in the IndexedDB.
If the user already has a token in the IndexedDB then the AutoLoginGuard will redirect
the user from the welcome page and straight to their profile page.

All guards can be found in:
- `src/app/guards/`
- `src/app/authentication/`




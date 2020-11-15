# ![TMPLNR LOGO](UX2/src/assets/icons/icon-96x96.png)  UX Cluster / Project Implementation Cluster

###Symfony WebService + Ionic-Angular Rostering PWA. 

Requirements for Installation: 

1) Node 

2) MySQL or MariaDB 

3) Yarn or NPM

4) Ionic CLI & Angular CLI

5) openssl

6) PHP 7.2 or higher

7) Symfony CLI 
   
    Installation:
    npm install -g @angular/cli or yarn add -g @angular/cli
    npm install -g @ionic/cli or yarn add -g @ionic/cli
   
    linux: wget https://get.symfony.com/cli/installer -O - | bash
    macos: curl -sS https://get.symfony.com/cli/installer | bash
    windows: https://get.symfony.com/cli/setup.exe

Be sure to make these globally available.

* #### Clone the repository:

Download the [ZIP](https://github.com/lrdswag/TMPLNR-20/archive/master.zip)

or in your terminal:
`git clone https://github.com/lrdswag/TMPLNR-20.git`

* #### Automated Application Installation

In the project root, run: `sh install.sh`

the backend webservice is now running at https://localhost:8000 and the tests have been executed.

- #### Manual Database Configuration
  
  In the event that you were unable to successfully use the install.sh file to configure the database setttings for you.
  
  In the PROJ/.env file, add the database_url settings applicable to your database.
  
  DATABASE_URL=mysql://db_user_:db_password_@127.0.0.1:3306/db_name?serverVersion=5.7
  
  In the PROJ/.test.env add the database_url setttings applicable to your database
  
  DATABASE_URL=mysql://db_username:db_password@127.0.0.1:3306/test_db?serverVersion=5.7
  
  Once these have been added, you may create the database if it has not yet been created by entering: 
  
      symfony console doctrine:database:create
  
  To create the test database run: 
  
      symfony console doctrine:database:create --env=test
  
  To create and update the schema run:
  
      symfony console doctrine:schema:update --force
      symfony console doctrine:schema:create --env=test

- #### Manually Running Webservice Test Scripts
  
  If for any reason, the automated test script does not run, you can run the test script manually by running: `php bin/phpunit`
  
  The php file that contains all of the test script functions can be located in the
  
  PROJ/tests/ApiTest.php file.

- #### Manually Loading The Dummy Data
  
  If for any reason, the dummy data failed to load in the PROJ directory run:
  
      symfony console doctrine:fixtures:load
      TYPE YES when prompted to purge database.
      This only clears any rows of data and not the entire database.
* #### Automated Webservice Testing Script.
  
  As part of the installation script you will see the installation of the testunit compoer package. And in the terminal, 16 tests will be performed with the result being displayed. 

The location of the TestScript php file is: `PROJ/tests/ApiTest.php`

      There are 16 tests that are performed in total.
    
      - create user (POST) - 201 CREATED
      - edit user (PUT) - 200 OK
      - delete user (DELETE) - 204 NO CONTENT
      - get user (GET) - 200 OK
      - get users (GET) - 200 OK
      - user login (POST) - 200 OK
    
      - create shift (POST) - 201 CREATED
      - edit shift (PUT) - 200 OK
      - get shift (GET) - 200 OK
      - get shifts (GET) - 200 OK
      - delete shift (DELETE) - 204 NO CONTENT
    
      - create comment (POST) - 201 CREATED
      - edit comment (PUT) - 200 OK
      - delete comment (DELETE) - 204 NO CONTENT
      - get comment (GET) - 200 OK
      - get comments (GET) - 200 OK
    
      logs of the tests can be found in src/var/test.log
    
      I have left DOC blocks above each test function to explain each one of its uses.
      These are found in PROJ/test/ApiTest.php

After installation is finished, the webservice will be running at `https:localhost:8000`
and the front end is running at `http://localhost:4200`

I have set a default login for the admin user: 

- email: `admin@example.com`
- password: `password`

> After login, you will be redirected to your profile page where you can update your details.

> The user session is tracked with a JWT token which utilizes the RS256 algorithm.
> This JWT can be decoded to see the payload but no sensitive information is available.
> The Token is then saved using "Ionic Storage" module. It saves the token payload in the users indexedDB on their browser. 

> From here you may navigate to the shift's dashboard. On the shift dashboard you can view either of the two calendars.
> One calendar displays the "not yet approved" shifts while the other shows "approved" shifts.

> With in the calendars I you can toggle between month, week and day view.
> Events that are displayed, list the start and end time as well as the user's first name.

> You can click on the event, and it will route to the shift details whilst performing a get request for that shift.

> This provides a good reference for employees and employer to see the 
> upcoming shifts that are locked in and plan for the other shifts.

> On the shifts list page I have implemented a filter button that activates an 
> action sheet which appears from the bottom of the screen. This works by calling the function which is subscribed to the HTTP request with 
> the relevant query parameters. 

> All HTTP requests can be found in their respective service.ts files. 
> For all Http Request I have utilized the Angular Observable and Subscriber methods.
> The JSON for each entity is mapped using an interface class. This defines the datatype for each field as well as the 
> structure of JSON object/array. Then for each HTTP request an Observable of the relevant class is assigned. With the 
> Observable assigned I can then construct the service in any component and simply subscribe to the Observable to gain access
> to the JSON data.

> To provide the JSON Web Token with each request I have created a http.interceptor.ts file.
> This intercepts all outgoing HTTP requests and grabs the token to add in the HTTP header.

> Upon logout, the token is cleared from the user's browser, and the user is redirected to the home page.



- #### Technologies Used
  
  For the Symfony 5 Back End Webservice I have used the following technologies:
  
  - ###### Api-Platform
    
    This bundle was used as the method to provide all of the endpoints for the each of the entities. Taking advantage of doctrine annotations and the already mapped schema provided by doctrine orm, by marking each entity class as a "@ApiResource" a post, put, get all, get one, patch, and delete are provided. 
    
    Taking further advantage of the provided fetaures of Api-Platform, I used the "@Groups" in the php doc blocks this allowed the dictation of which information could be read or write and shared with other api resources. such as, when looking for a scheduled_shift I am able to see who is on duty and their uuid, firstName, and lastName. These examples can be found in the PROJ/src/Entity files.
  
  - ###### Lexik JWT Authentication Bundle
    
    This is firstly configured in the PROJ/config/packages/lexik_jwt_authentication.yaml.
    
    I have elected RS256 as the preferred method of enryption. 
    
    To inject the services provided by lexik jwt, I have created 3 files:
    
    AuthenticationFailureResponse.php
    
    AuthenticationSuccessListener.php
    
    JWTCreatedListener.php
    
    These are all located in PROJ/src/EventListener/
    
    To register these service with Symfony I have added the necessary code to the services.yaml file located in PROJ/config
    
    To configure this package you must create a JWT passphrase which is usuall stored in the .env file. A private.pem file is generated in the terminal which uses this passphrase as well as the private.pem file. 
    
    After this when a user successfully logs in, they are sent a JWT containing the payload with information about their uuid, and roles. 
  
  - ###### Nelmio Cors Bundle
    
    This bundle is utilized by setting the configuration within the PROJ/config/packages/nelmio_cors.yaml
    
    Currently I have allowed for the acceptance of Content-Type and Authorization headers to be used with a request.
    
    In the response, I have exposed the Link, Location, Set-Cookie headers.
    
    In the dev environment I have configured the allow origin settings as all, but for the prooduction settings I have it set exclusively for the intended domain used by the front end. 
  
  - ###### Ramsey UUID-Doctrine Bundle
    
    This bundle integrates the ramsey UUID package to work with doctrine.
  
  - ###### Ramsey UUID Bundle
    
    This provides the ability to use UUID as the unique identifier for each of the entities used. The code for the implementation of this bundle is found in each of the PROJ/src/Entity/ files. In the private $id attribute you will see in the DOC Block above the declared datatype. Also it has been registered in the PROJ/config/packages/doctrine.yaml file to notify doctrine.
  
  - ###### Indraganuwan API Rate Limiter Bundle
    
    This bundle is utilized by setting the applicable configuration the PROJ/config/packages/prod/indraguwan_api_rate_limit.yaml file
    
    This does not take effect in the dev environment. When building the symfony project for production it is then utilized. 
  
  - ###### Doctrine ORM
    
    Doctrine ORM is used throughout the application is the tool used to map the data schema of my database. Each of the datatypes of the entity attributes have been mapped using Doc Blocks above the declared attribute. 
  
  - ###### Symfony Security Bundle
    
    The security bundle is used by means of providing the needed confiiguration with the PROJ/config/packages/security.yaml file.
    
    In this file I register the User entity and the methods used for authenticating the user. In this file I have registered the login endpoint which is also configured in the routes.yaml. The security guard provided by lexik JWT is also configured within this yaml file.
  
  - ###### Symfony Maker Bundle
    
    This bundle has been utilized during the development process. I have utilized it purely as mean to speed up development by using the generating of classes and services.
    
    
  
  For the Ionic 5 / Angular 10 Front End API I have used the following technologies:
  
  - ###### Date-FNS module
    
    This module is utilized along side the Angular Calendar 6+ module.
    
    It converts the date and time formats to the needed formats used by the angular calendar.
  
  - ###### Angular-Calendar 6+
    
    This is great calendar module which I have implemented twice in the front end application. It can be found in the UX2/src/app/pages/shifts/calendar/ and draft-calendar folders. To route to the calendars, select the sidebar menu after logging in then head to shifts dashboard and the two seperate calendars are listed and the menu and can navigated to from this page. For this calendar I have also used some of the other optional features such as, date title format provider, and the customer data displayed on the event on the calendar.
  
  - ###### Ionic Storage
    
    This has been utilized multiple times but mainly as a means to authenticated and store the users JWT. After the user logs in they are redirected to there profile page with their personal details. This is achieved by saving the response received from the webservice and then each time the user navigates to the profile page the UUID which is found in the JWT payload is taken from the IndexedDB and used in the get query for retrieving the user details.
    
    The first use of this can be found in: UX2/src/app/authentication/authentication.service.ts which is the file used for authentication in the event of a user login.
    
    For the personal messages I have also used the same method of retreiving the users UUID from the IndexedDB and then prefilling the form field that displays whom sent the message and is also used for receiving the messaged intended for that individual. When a non user adds a shift I have also imlemented this to add that user as the onduty value in the form. 
  
  - ###### Angular / Reactive Forms
    
    For every single form I have used the Reactive Forms module instead of the template driven forms provided by Angular. Reactive Forms are mapped to the entities individual datatypes. Also in the component.ts for each of the forms I am able to use Validators such as 'Required' and 'minLength'. Before each form is submitted an if statement to check that the form is valid and the form is dirty (Altered) is used to prevent invalid forms using up webservice resources. 
  
  - ###### RXJS
    
    This is used throughout the entire app. 
    
    In the service.ts files which are used to make the XMLRequested to the webservce I have made each function an RXJS Observable. This is achieved by creating an interface.ts file that maps the entity and all of the datatypes as well as the json structure. This allowed me to make all requests made an observable which maps the data that is received. This prevents incorrect data from being displayed and very easy to use interpolation through out the html template files. 
  
  - ###### Firebase
    
    Firebase is used as a means of deployment of the front of the application. 
    
    The configuration is found in the UX2/src/environment/envoronment.ts
    
    Along side having the firebase-tools package installed globally I can run ionic build --prod and firebase deploy for easy deployment
  
  - ###### Angular Router
    
    Angular router can be found on everysingle page. The main router outlet is located in the UX2/src/app/app.component.html file. This is the central point of where all of the content is rendered. 
    
    All of the routes are lazy loaded by loading the individual module that belongs to each page. Each route is configured and listed on the UX2/src/app/app-routing.module.ts file.




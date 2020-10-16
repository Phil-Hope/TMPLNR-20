
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

### WEBSERVICE "PROJ" Instructions
* #### Clone the repository:
 
Download the [ZIP](https://github.com/lrdswag/TMPLNR-20/archive/master.zip)

or in your terminal:
`git clone https://github.com/lrdswag/TMPLNR-20.git`

* #### .env Configuration
If .env is not already added, in the PROJ root directory, create a .env file with the following configuration: 

     APP_SECRET=YOUR_SECRET
     APP_ENV=dev
     DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
     
     JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
     JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
     JWT_PASSPHRASE=HI_IM_A_RANDOM_PASSPHRASE_:-P
_To generate a new "APP_SECRET" and "JWT_PASSPHRASE" you may use:_

    php -r 'echo base64_encode(random_bytes(32)), PHP_EOL;'

* #### .env.test Configuration


    KERNEL_CLASS='App\Kernel'
    APP_SECRET='$ecretf0rt3st'
    SYMFONY_DEPRECATIONS_HELPER=999999
    PANTHER_APP_ENV=panther
    
    DATABASE_URL=mysql://root:@127.0.0.1:3306/api_test?serverVersion=8.0


* #### Install Vendor Packages and Node Modules

In PROJ directory root, run:
      
1) `composer install`
2) `yarn install` or `npm install`
3) `yarn build` or `npm run-script build`

* #### Configure Cors

open config/packages/nelmio_cors.yaml and ensure the following configuration is set, as a minimum:

      nelmio_cors:
          defaults:
              allow_credentials: true
              origin_regex: true
              allow_origin: ['*']
              allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
              allow_headers: ['Content-Type', 'Authorization']
              expose_headers: ['Link', 'Location', 'Set-Cookie']
              max_age: 1000
          paths:
              '^/': ~`

* #### Create and Configure MySQL Database 
_Ensure your database details are configured in the .env file._

1) `symfony console make:doctrine:database`
2) `symfony console doctrine:schema:update --force`

to validate that the schema mapping is correct run:

`symfony console doctrine:schema:validate` 

_please note: some versions of mariadb do not support json data type and will cause doctrine to display a mapping validation error. You can ignore this._

    If there are any other mapping errors, run:       
    symfony console doctrine:schema:update --dump-sql 

_This will display the query that is required to map the schema correctly_

* #### Create and Configure the Test Database

1) `symfony console doctrine:database:create --env=test`
2) `php bin/console doctrine:schema:create --env=test`

* #### Configure the JWT tokens  
_if the directory does not yet exist_ in your terminal, run: 

`mkdir -p config/jwt`

**Create private.pem file**

    openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096

_It will prompt you for a passphrase, which is the one created in the .env file under JWT_PASSPHRASE. 
Copy paste the passphrase each time it is needed._

**Create public.pem file**

    openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

* #### Load the default Admin User
`symfony console doctrine:fixtures:load`

_This inserts a user with admin access to the database with the following credentials_


   **email**: `admin@example.com`
   **password**: `password`


* #### Start Symfony's Built In Webserver

To install the ssl certificate, run:

    symfony server:ca:install
 
To start the web server, run:

    symfony serve
      
The local webserver will now be available at `https://localhost:8000` 

* #### Running Webservice API tests

      
      All of the testing functions can be found in src/Test
      These functions test seperate test entities that are found in src/App/ApiPlatform/Test.
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
      
      To run these tests, run:
      php bin/phpunit
      
      In the terminal you will see the test and the results.
      
      For a more detail view of the results, you may find the log generated by 
      the test in src/var/test.log
      
      I have left DOC blocks above each test function to explain each one of its uses.
      
      
## User Interface "UX" Instructions

##### Install Node Modules

In the UX directory root run:
 
    npm install  or  yarn install

##### Start The WebServer
    npm start

This will start a webserver at `http://localhost:4200`

#### Application Instructions:

I have set a default login for the admin user: 

- email: `admin@example.com`
- password: `password`

>After login, you will be redirected to your profile page where you can update your details.

>The user session is tracked with a JWT token which utilizes the RS256 algorithm.
>This JWT can be decoded to see the payload but no sensitive information is available.
>The Token is then saved using "Ionic Storage" module. It saves the token payload in the users indexedDB on their browser. 

>From here you may navigate to the shift's dashboard. On the shift dashboard you can view either of the two calendars.
>One calendar displays the "not yet approved" shifts while the other shows "approved" shifts.

>With in the calendars I you can toggle between month, week and day view.
>Events that are displayed, list the start and end time as well as the user's first name.

>You can click on the event, and it will route to the shift details whilst performing a get request for that shift.

>This provides a good reference for employees and employer to see the 
>upcoming shifts that are locked in and plan for the other shifts.

>On the shifts list page I have implemented a filter button that activates an 
>action sheet which appears from the bottom of the screen. This works by calling the function which is subscribed to the HTTP request with 
>the relevant query parameters. 

>All HTTP requests can be found in their respective service.ts files. 
>For all Http Request I have utilized the Angular Observable and Subscriber methods.
>The JSON for each entity is mapped using an interface class. This defines the datatype for each field as well as the 
>structure of JSON object/array. Then for each HTTP request an Observable of the relevant class is assigned. With the 
>Observable assigned I can then construct the service in any component and simply subscribe to the Observable to gain access
>to the JSON data.

>To provide the JSON Web Token with each request I have created a http.interceptor.ts file.
>This intercepts all outgoing HTTP requests and grabs the token to add in the HTTP header.

>Upon logout, the token is cleared from the user's browser, and the user is redirected to the home page.


**Add some shifts! Check out the admin dashboard and calendars.**



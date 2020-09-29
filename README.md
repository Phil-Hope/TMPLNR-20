#  TAFE PROJECT
**This is a symfony + Angular Rostering Application. 📅**

Prerequisites 
- Node 
- MySQL or MariaDB
- Composer 
- Yarn or NPM
- Ionic CLI & Angular CLI

      npm install -g @angular/cli or yarn add -g @angular/cli
      npm install -g @ionic/cli or yarn add -g @ionic/cli
      
- PHP 7.2 or higher
- Symfony CLI 


    linux: wget https://get.symfony.com/cli/installer -O - | bash
    macos: curl -sS https://get.symfony.com/cli/installer | bash
    windows: https://get.symfony.com/cli/setup.exe
      
Be sure to make these globally available.

#### WEBSERVICE "PROJ" Instructions
- Clone the repository `https://github.com/lrdswag/TMPLNR-20.git`

In the PROJ directory root run
 
- `composer install`
- `yarn install` or `npm install`
- `yarn build` or `npm run-script build`

add a .env file with the database url - example: `DATABASE_URL=DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"`

to create a database run: 
- `symfony console make:migration`
- `symfony console doctrine:database:create`
- `symfony console doctrine:migrations:migrate`

to validate that the schema mapping is correct run:
- `symfony console doctrine:schema:validate` 

_please note: some versions of mariadb do not support json data type and will cause doctrine to display a mapping validation error. You can ignore this._

If there are any other mapping errors you may run: `symfony console doctrine:schema:update --dump-sql` 

_This will display the query that is required to map the schema correctly_

Now that the database is created and mapped correctly, run:
 - `symfony server:ca:install`
 - `symfony serve`
 
 This installs a ssl certificate and starts the local webserver at `https://localhost:8000` 

### User Interface "UX"

In the UX directory root run:
 
- `npm install` or `yarn install`
- `npm start`

This will start a webserver at `http://localhost:4200`

Application Instructions:

- Register new user

this will create a new user with Admin privileges.
I have not yet set a redirect, but in the web tools bar you can see the post request for a new user and a 201 status code.

A HTTP only session cookie is given and used with all future requests. This also the same for a user login event.

You can then navigate to the add new shift page. Create a shift, and a post request with a 201 status code is received.

Navigate to schedule, and you can see the new shift that has been created. To create a new user you can navigate to admin dashboard and click 
add user. You can add a new user with the selected privileges. Navigate to users to view the new user.




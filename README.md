TAFE PROJECT

This is a symfony + React Rostering Application.

To launch-

- Clone the repository
- In the directory root run:
      -composer install
      -yarn install
      -yarn build
      -yarn encore dev --watch
      
      # to launch built in php web server
      -php -S localhost:8000 -t public
      or prefererably run symfony serve if you have symfony cli installed.
      this will run the web server with ssl. The POST form for add user is set to https://localhost:8000/new_user
      
      in the .env file add your database connection string.
      
      run php bin/console doctrine:make:database
      php bin/console doctrine:migrations:migrate
      
      to confirm that a database is create and connected properly,
      run php doctrine:schema:validate
      if it is not in sync you may run:
          php bin/console doctrine:schema:update --dump-sql
          this will show what aspects of the schema mapping and database are not in sync.
      You may find that your database version does not support json data type which cause the 
      schema validation error. You can just ignore this.
      
 Navigate to localhost:8000
 click on the menu and register,
 upon registration you will be redirected to the Manager Dashboard.
 
 You can add a shift directly from the link on your screen. 
 The add user link is broken, as this is currently directed to the twig html file.
 To add a user, go to https://localhost:8000/new_user which is displayed using React and Fetch
 
 to view shifts: navigate to localhost:8000/scheduled/shifts
 This is also being displayed using react.
 
 To see the backend API endpoints. go to localhost:8000/api
 to view all possible routes that are not visible by menu in the command line run: 
    -php bin/console debug:route
 
 All of the UX files are found in the assets folder as well as the templates folder.
 I am using symfony routes for navigation. The API is fueled by doctrine which queries the MySQL database
 with the built in entity manager. 
 
 Upon login the user is authenticated and given a session cookie.
 When registering your password is encrypted. Please note - that the localhost:8000/new_user is not yet configured
 to hash passwords. 
 

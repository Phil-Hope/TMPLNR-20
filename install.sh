#!/bin/bash

cd PROJ || exit

FRONT='http://localhost:4200'

PASS= php

echo "Hello, $USER. lets set up your environment."

echo -p "Enter you database username and press [ENTER]: "
read -r username

echo -p "Enter database password and press [ENTER]: "
read -s -r password

ENV='.env' && echo "DATABASE_URL=mysql://$username:$password@127.0.0.1:3306/tmp_db" >> $ENV;

TEST='.env.test' && echo "DATABASE_URL=mysql://$username:$password@127.0.0.1:3306/test" >> $TEST;

composer install

symfony console doctrine:database:create

symfony console doctrine:schema:update --force

symfony console doctrine:database:create --env=test

symfony console doctrine:schema:create --env=test

yes | symfony console doctrine:fixtures:load

symfony console cache:clear

composer req test

symfony server:ca:install

symfony serve

php bin/phpunit

cd ../UX2 || exit

npm install

npm start && google-chrome "${FRONT}"

# How to run:
 - run sql from **config/sequalize/schema.sql** on highest level of your MySQL database
 - when running for the first time -> create docker containers by running `npm run docker:create` in your command line, otherwise run `npm run docker:start`
 - run the application using `npm start`
 - when you are finish, shut down the docker container by running `npm run docker:stop`
# Template Service

This is a template repository to quickly bootstrap a micro-service using [fastify](https://www.fastify.io)

## Contents
The following features are available:
- Mongo as database
- Swagger for API definition
- Cors
- Cookies
- JWT  

An extensive list can be found in the package.json file

### Fastify plugins

The following features were bundled as plugins and can be found in the plugins folder
- caching
- authentication (using JWT)

## Setup
Some template variables were using all through the files and they should be replaced.

The `template.js` file can be used in order to replace template variables.
In particular, the following template variables were used: 
- name: the name of the service
- company: the name of the company

The following script should be launch to init the repository with the proper naming:

```
$ node template {{name}} {{company}} 
```
E.g. 
```
$ node template ease-booking easets
```

A default favicon can be setup as well by putting a file named `favicon.ico` at the root of the project.

You should then update the package.json with values as you see fit

## Dev Dependencies

### Hooks

GIT hooks are setup using [husky](https://github.com/typicode/husky).
In particular the `pre-commit` and the `pre-push` are added to run the linter and the tests respectively.
The configuration of husky can be found in `.huskyrc.json`.

Notes: During a rebase you may want to skip all hooks, you can use HUSKY_SKIP_HOOKS environment variable.
```
$ HUSKY_SKIP_HOOKS=1 git rebase ...
```

NB: Some issues could appears with versions of node and NPM.
Please either update to the latest available version of have a look at [husky issues](https://github.com/typicode/husky/issues)

### MongoDb ( using docker-compose)

Inside the `dev` folder, can be found a `docker-compose` 
file which can be used to launch a local instance of a mongo database.
This can be accomplished with the following commands (assuming you already have docker and docker-compose) installed.
```
$ cd dev
$ docker-compose up -d
``` 

## Linter
A default linter is setup using [esLint](https://eslint.org).
 - The configuration can be found in `.eslintrc.json`
 - The lint ignore file can be found in `.eslintrc.json`
 The following scripts can be launched to trigger the linting of source files
```
$ npm run-script lint
$ npm run-script lint-fix
``` 

## Test
A testing framework is setup using [Jest](http://jestjs.io).
The configuration of Jest can be found in `jest.config.js`.

All tests should be put inside the `test` folder.
Before running the test suite, the `NODE_ENV` variable is set as `TEST`.
This setup can be changed in the `test/setEnvVars.js` file.

The test suite can be launched using the command:
```
$ npm test
``` 

## CI (Github Action)
That workflow will be triggered for every push of your code. On the CI machine, a local test database will be launched, and a set of defined commands will be launched.
In the `.github/workflows/test.yml`, you can find the workflow script.


## Deploy 

### Standalone

The service launch from the code using:
```
$ node --harmony server.js
``` 
You can also add you favorite Node process manager

### Docker

The service can also be packaged as a docker container.
A `Dockerfile` is provided and can be used.

### Heroku (container deploy)

[Heroku](https://www.heroku.com) can be used to deploy this application.
Assuming you already have an heroku account, you can install the heroku CLI and run the following command:
``` 
$ heroku login
$ heroky create my-brand-new-service
$ heroku stack:set container
``` 
Now, you can go on the Heroku dashboard, to setup the deploy configuration.

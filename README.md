# CHECKED

## API
#### Tools needed:
1. Yarn
2. Typescript
3. Node
4. Mongodb

#### Starting server:
* Ensure that you are in `/api/` directory
* Run `yarn` command to fetch all dependencies
* Run `yarn run mongo:start` command to start the mongodb
* Run `yarn start` command to start the server locally
* Note: `.env` file must be present for the server to run

#### Stopping server:
* Simply kill the node process
* Run `yarn run mongo:stop` command to kill the mongodb background process

#### Heroku deployment
* Run `yarn release` to docker the project and release to production
* Run `yarn logs` to see live logging information in heroku

---

## SCHEDULER
#### Tools needed:
1. Yarn
2. Typescript
3. Node

#### Starting server:
* Ensure that you are in `/scheduler/` directory
* Run `yarn` command to fetch all dependencies
* Run `yarn start` command to start the server locally

#### Heroku deployment
* Run `yarn release` to docker the project and release to production
* Run `yarn logs` to see live logging information in heroku

---

## MOCKER
#### Tools needed:
1. Yarn
2. Typescript
3. Node

#### Starting script:
* Ensure that you are in `/mocker/` directory
* Run `yarn` command to fetch all dependencies
* Run `yarn start` command to start the script locally
* Change values in `config.ts` to adjust generation settings
* Note: `.env` file must be present for the script to run
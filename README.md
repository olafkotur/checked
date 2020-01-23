# CHECKED

## API
#### Tools needed before:
1. Yarn
2. Typescript
3. Node
4. Mongodb

#### To start the server:
* Ensure that you are in `/api/` directory
* Run `yarn` command to fetch all dependencies
* Run `yarn run mongo:start` command to start the mongodb
* Run `yarn start` command to start the server locally

#### To stop the server:
* Simply kill the node process
* Run `yarn run mongo:stop` command to kill the mongodb background process

#### Heroku deployment
* Run `heroku addons:create mongolab:sandbox` created mongo instance, only need to run once
* Run `heroku container:login`
* Run `heroku container:push web -a checked-api` this builds the image so may take some time
* Run `heroku container:release web -a checked-api`
* Optional, run `heroku logs -a checked-api --tail` for live app log information

## Checked Web App
#### Requirements
1. Yarn
2. Typescript

#### Setup
1. Make sure to be in the `checked-web` directory.
2. Run `yarn add`. Do this each time you pull new changes, this installs all relevant node_modules from new packages.
3. Then run `yarn start` to run the client at `localhost:3000`

#### Linting
* ESLint has been configured with this project.
* Using the ESLint Extension from VSCode is reccomended
* Else, run `yarn lint` before committing changes, and fix any errors.
---

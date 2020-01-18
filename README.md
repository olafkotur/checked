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

---

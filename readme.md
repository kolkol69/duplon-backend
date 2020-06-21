# Getting started

Before starting, make sure you have `.env` file. (Ask @Maks)

## Starting server

1. clone repo
2. make sure you have all Prerequisites installed
3. run `yarn install` inside the root folder of the prj
4. run `yarn start`
5. in case of success => follow the url to local instance of the server

## Starting database

1. install mongodb prerequisites
2. create a folder on your computer (mine is `/Users/maksymkolodiy/data/db`)
3. run your db with `mongod --dbpath=/Users/maksymkolodiy/data/db`
4. default listening on 127.0.0.1 port 27017 (mongodb://localhost:27017/mongo-duplon)
5. adding .env to heroku (https://devcenter.heroku.com/articles/config-vars)

## API

### User

// **WIP** -> work in progress, end point that you cant use yet

* Create tenant (returns you tenantID to create user for this tenant)
`/tenant/create?name=<tenantName>`

* Create user (pass tenantID of the proper tenant)
`/user/create?tenantID=<tenantID>&login=<userLogin>&password=<userPassword>`

* **WIP** Update user 
`/user/update`

* **WIP** Delete user
`/user/delete`

* **WIP** Create coupon 
`/coupon/update`

* **WIP** Update coupon 
`/coupon/update`

* **WIP** Delete coupon
`/coupon/delete`

# Prerequisites

- node 10.15.3
- yarn 1.21.1
- npm 6.13.4
- mongodb: 3.5.8
- mongoose: 5.9.16

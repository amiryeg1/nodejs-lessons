[![License: ISC](https://img.shields.io/badge/License-ISC-red.svg)](https://opensource.org/licenses/ISC)
# mongodb database
as you saw in the [previous lesson](https://github.com/amiryeg1/nodejs-lessons/tree/master/L6-user-authentication) , we simulated an authenticating system but we stored the data in arrays.
in this lesson, we use mongodb and mongoose to store our data inside the database.

## mongodb

MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database.
It is based on the NoSQL document store model.
The data objects are stored as separate documents inside a collection — instead of storing the data into the columns and rows of a traditional relational database.

## mongoose
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
Mongoose supports both promises and callbacks.

Mongoose provides a straight-forward, schema-based solution to model your application data.
It includes built-in type casting, validation, query building, business logic hooks, and more, out of the box.

---
- [app code](https://github.com/amiryeg1/nodejs-lessons/blob/master/L7-mongodb-database/app.js)
---
## How It Works?
first, we need to set a value for our environment variable `mongodb_exercise_jwtPrivateKey` as the token password

open the terminal and run the command
```
export mongodb_exercise_jwtPrivateKey=secretKey
```
in the code above I used `secretKey` as my password. (you can set it to anything)

now all we need to do is to start the app
```
npm start
```
![svg file](https://github.com/amiryeg1/nodejs-lessons/blob/master/L7-mongodb-database/views/start.svg)

open your browser and go to

www.localhost:3000 or www.localhost:3000/home

an HTML file will open and guide you to work with the app.

**or**

request to www.localhost:3000/signup for registering user

request to www.localhost:3000/login  for logging in

request to www.localhost:3000/names  for seeing the list of users registered
# Dependencies 
- express
  - read express article [here](https://www.npmjs.com/package/express)
- mongoose
  - read mongoose article [here](https://www.npmjs.com/package/mongoose)
- body-parser
  - read body-parser article [here](https://www.npmjs.com/package/body-parser)
- bcrypt
  - read bcrypt article [here](https://www.npmjs.com/package/bcrypt)
- JSON-web-token
  - read JSON-web-token article [here](https://www.npmjs.com/package/jsonwebtoken)
- config
  - read config article [here](https://www.npmjs.com/package/config)

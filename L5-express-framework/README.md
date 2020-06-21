[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
# Express Framework
Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It facilitates the rapid development of Node based Web applications.

so , we use express framework to create http server and send requests to it.

in this exercise we use express to create a server and we simiulate a sign up page to post our data .
- [app code](https://github.com/amiryeg1/nodejs-lessons/blob/master/L5-express-framework/app.js)
- [test code](https://github.com/amiryeg1/nodejs-lessons/blob/master/L5-express-framework/app.test.js)
## How It Works ?
open terminal and run
```
npm start
```
open your browser and go to

www.localhost:3000 or www.localhost:3000/register

enter your name and click `submit`

once you click submit , you will be redirected to www.localhost:3000/names which respond with `{ success: true }`

reload the page and you can see all the names you have submitted . 

## Test Cases
this task supports jest as test framework

open terminal and run
```
npm test
```

# Dependencies 
- express
  - read express article [here](https://www.npmjs.com/package/express)
- body-parser
  - read body-parser article [here](https://www.npmjs.com/package/body-parser)
- jest
  - read jest article [here](https://www.npmjs.com/package/jest)
- super-test
  - read super-test article [here](https://www.npmjs.com/package/supertest)

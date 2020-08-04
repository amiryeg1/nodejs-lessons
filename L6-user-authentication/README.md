# user authentication
before storing username and password in database , we need to hash the password for securing the app

When a password has been “hashed” it means it has been turned into a scrambled representation of itself. A user's password is taken and – using a key known to the site – the hash value is derived from the combination of both the password and the key, using a set algorithm.

we use `bcrypt` for hashing our password
```js
const bcrypt = require("bcrypt")
const salt = await bcrypt.genSalt(10);
hashedPassword = await bcrypt.hash(password, salt);
const validPassword = await bcrypt.compare(unhashedPassword, hashedPassword);
```
Authentication is the process of determining if the user is who he/she claims to
be. It involves validating their email/password.

- [app code](https://github.com/amiryeg1/nodejs-lessons/blob/master/L6-user-authentication/app.js)
## How It Works ?
open terminal and run
```
npm start
```
open your browser and go to

www.localhost:3000 or www.localhost:3000/signup

enter your username and password , then click `sign up`

you should get a message which says `you signed up successfully`

now go to www.localhost:3000/login and enter the username and password you signed up with.
if the password is correct , you will get a respond which says `login success`
else you will end up with the message `invalid name or password`

*NOTE:this project is developed without using any database . in the next lesson we're going to rebulid the app using mongodb*
# Dependencies 
- express
  - read express article [here](https://www.npmjs.com/package/express)
- body-parser
  - read body-parser article [here](https://www.npmjs.com/package/body-parser)
- bcrypt
  - read bcrypt article [here](https://www.npmjs.com/package/bcrypt)

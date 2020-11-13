![MIT](https://img.shields.io/badge/license-MIT-blue)
![size](https://img.shields.io/badge/size-183.8%C2%A0KB-brightgreen)
![files](https://img.shields.io/badge/files-20-yellow)
# OAuth EmailSender
in this lesson, we will implement a full authentication system which uses both local and google [OAuth 2.0](https://oauth.net/2/) method.

also, we will use [nodemailer](https://nodemailer.com/) which is an email sending service to send an email to the newly registered users.

---
## How It Works?
First, we need to define the environment variables we need, so we can use them in the main codes

create a file named `.env` in the root folder and add these variables to it:
```
# Server connection
HOST=localhost
PORT=8080

#SESSION PASSWORD
SESSION_SECRET=your password

# DB connection
DB_HOST=localhost
DB_NAME=your database name

# EMAIL SENDER
EMAIL_USERNAME=your email address (as String)
EMAIL_PASSWORD=your email password (as String)

# GOOGLE CREDENTIALS
CLIENT_ID=your google client ID (as String)
CLIENT_SECRET=your google client secret (as String)

```
after variable declaration, we need to get our google `client ID` and `client secret` [from here](https://console.developers.google.com) and add them to .env file

and that's it! our authentication app is ready to work.

open terminal and run: 
```
npm start
```
PS: the app also shows the log on the terminal
![connect svg](https://github.com/amiryeg1/nodejs-lessons/blob/master/L8-OAuth-EmailSender/views/readmeFiles/connect.svg)

going to `localhost:8080` will take you to the home page 

![home page](https://github.com/amiryeg1/nodejs-lessons/blob/master/L8-OAuth-EmailSender/views/readmeFiles/homePage.png)

from there, you can choose between local sign up and google sign up

when you sign up for the first time, an email will be sent to your inbox with the title `Email Registration!` containing this text:
```
congratulations
 you successfully logged in to this website
 ```


after registering to the server, you will be redirected to your profile page
![profile](https://github.com/amiryeg1/nodejs-lessons/blob/master/L8-OAuth-EmailSender/views/readmeFiles/profile.png)

## important dependencies 
- express
  - read express article [here](https://www.npmjs.com/package/express)
- mongoose
  - read mongoose article [here](https://www.npmjs.com/package/mongoose)
- passport
  - read passport article [here](https://www.npmjs.com/package/passport)
- nodemailer
  - read nodemailer article [here](https://www.npmjs.com/package/nodemailer)
- passport-google-oauth
  - read passport-google-oauth article [here](https://www.npmjs.com/package/passport-google-oauth)

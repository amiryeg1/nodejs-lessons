# OAuth EmailSender
in this lesson we will implement a full authentication system which uses both local and google [OAuth 2.0](https://oauth.net/2/) method .

also we will use [nodemailer](https://nodemailer.com/) which is an email sending service to send an email to the newly registered users 

---
## How It Works ?
First we need to define our environment variables we need so we can use them in the main codes

create a file named `.env` in the root folder and add these variable in it
```

```
after variable declaration we need to get our google `client ID` and `client secret` [from here](https://console.cloud.google.com/) and add them to .env file

and thats it ! our authentication app is ready to work

open terminal and run 
```
npm start
```
PS : the app also shows the log on terminal

going to `localhost:8080` will take you to the home page 



from there, you can choose between local sign up and google sign up

when you sign up for the first time, an email will be sent to your inbox


after registering to the server, you will be redirected to your profile page

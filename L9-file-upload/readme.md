# File Upload
in this lesson we will implement an uploading system which supports three environments to upload your files

1. [Local storage](#Local-Storage)
2. [Database storage](#Database-storage)
3. [Server storage](#Server-Storage)

## How It Works
cd inside root directory and run ``` npm install``` to install the dependencies.

after installing the dependencies, you can run the application by entering command: ```npm start```

![npm-start-svg]()

**greate,our server is running successfully on port `3000`**

going to `localhost:3000` will bring us to the home page

![home-page]()

**lets take a tour and get to know our app's functionallities step by step**
### Local Storage
you can upload your files to your disk storage using this field.

from the local storage section you can choose to upload one or multiple files at a time.

uploaded files are stored in ___*/uploads*___ directory in the root folder.

### Database Storage
we use [mongodb](https://www.mongodb.com/) as our database to store photos.
> note: only photos can be accepted

we can retrieve uploaded files by clicking on the `list of database uploaded files` button 

![database-files]()

### Server Storage
finally, for this section, we use [minio](https://min.io/) which is a cloud storage for storing our files.

after uploading your files, you can get a full detail of them by clicking on the `list of minio uploaded files buttom`
> note: details are shown in the command line interface

![minio-files-details]()

minio uploaded files can be downloaded directly from *l9-file-upload* [bucket](https://play.minio.io:9000/minio/l9-file-upload/)

or alternatively,by inputing file's name in the url, as example:

![download-example]()

downloaded files are stored in ___*/downloads*___ directory in the root folder.

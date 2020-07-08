# ToDo App

## Setup guide
> **Requirements**
> - node installed
> - mongodb installed

> **Setup**
> - clone the project
> - run ***npm i***
> - ensure mongo deamon is running

>**Environment Variables**
- Create a file in the root directory of the project and name it .env
- Add the folling inside the .env file. 
PORT="Port on which the server will run" eg. 3000
DATABASEURL="The database url" eg.mongodb://localhost:27017/todo
SECRETE="A string which is the secrete"eg. todoappsecrete  

EMAILPORT="Outgoing email server port" eg. 465  

EMAILHOST="Email host" eg. smtp.gmail.com  

EMAILUSER="User email" eg. user@domain.com  

EMAILPASS="User email password"  

DATABASEHOST="The address of the database"eg. localhost  

DATABASENAME="Name of the database" eg. todo  

DATABASEPORT="The port of the db process"eg. 27017  


> **Run**
> - Run ***node server.js***

> ### Making api calls**
**Pass these in the Headers**
>  > ***All endpoints exept [ Method: POST resource: /api/v1/users, Method: DELETE resource: /api/v1/users, /api/v1/users/login,  /api/v1/users/token, /api/v1/users/resetpass]***
>  - Pass the token received on login in the headers as token
>  - For the named endpoints above, pass the secrete set in the .env file in the headers as secrete

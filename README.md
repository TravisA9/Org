# Org

## To get started... (From the terminal)
#### Clone project:
* ```cd``` into the directory where you want to set up the server...
* ```git clone https://github.com/TravisA9/Org.git```

#### Set up Node and Express:
* Make sure NodeJS id installed on your computer
* ```$ cd path-to/Org/src```
* ```path-to/Org/src$ npm init```
* ```path-to/Org/src$ npm install express```

#### Install and set up MongoDB:
* [https://hevodata.com/blog/install-mongodb-on-ubuntu/](https://hevodata.com/blog/install-mongodb-on-ubuntu/)
* Create a database named `db`.
* Create tow collections, one named `users` and a second one called `groups`

#### Test:
* ```path-to/Org/src$  node app/server.js```
* Go to [http://localhost:8080/](http://localhost:8080/) in any web browser

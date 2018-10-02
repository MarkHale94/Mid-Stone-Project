# What2Play

----

## What is What2Play?
> What2Play is an app designed by me to solve the problem of collecting too many games, but never knowing what to play. What2Play solves this problem by picking a game for the user. This can be done either through going through the user's entire collection or by going through the user's custom categories. 

----

## What Was Used to Create What2Play?
* React.js
* Semantic UI React
* JSON-Server
* GiantBomb's Api

----

## How Do I Get Started?

### These are the steps you'll need in order to install What2Play on your local machine. 
> Note: all commands will need to be input without the quotations. The quotations are only for easier visibility unless otherwise stated.

* First, you will need to install Node.js and JSON-Server.
* Second, you will need to clone this repo down to your local machine.
* Next, you will need to go to where you have saved the cloned repo on your local machine and in the root of the application make an api directory.
* Inside of that directory create a "database.json" that has the resources "users", "gameCollection", and "userCategories". Each of these resources should be empty arrays.
* Next, you will go back to the root of your app and type into the terminal the command "npm install". This will download all of the dependencies of the application for you.
* Next, open another terminal window and go into the api directory and type into the terminal the command "json-server -p 8088 -w database.json"
* Next, in the root of the app directory type into the terminal the command "npm start" and enjoy.

----

## Entity Relationship Diagram
![ERD](https://i.imgur.com/c6CAZ4r.jpg)
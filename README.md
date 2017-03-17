# EvolveChallenge
My EvolveChallenge

How to install all dependencies
===================================
npm install

How to launch website
=====================
in the terminal "npm start"  (make sure that you are in the project folder)
open explorer and set the url http://localhost:3333 (it works!!)

How to launch service rest (in another terminal)
================================================
node Server/RestService.js(the server file)
http://localhost:3000/ (should return if the service is available)

How to launch automation testing (in another terminal)
=======================================================
1) Testing with  cucumber feature and step definitions we use grunt to launch cucumber js 
   with grunt cucumberjs at terminal command from Test folder. There is a GruntFile at Test folder
   with the configuration for cucumberjs to load features and step definitions.

grunt cucumberjs                  (make sure that you are in the Test folder)

2) There is a selenium js called navigate_challenge.js that runs an automation testing 
   with firefox browser. To run navigate_challenge.js go to Test folder and execute:

node navigate_challenge.js       (make sure that you are in the Test folder)



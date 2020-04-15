### 14/10/19

- started logging project progress
- still working on angular web app I've managed to get the app working correctly but still having trouble serving the app through node. I'm going to do a bit more looking into how node and express works

### 18/10/19

- I'm moving away from angular and the MEAN stack idea for my web app and instead I'm going to use react. react is more popular at the moment for single page web apps and its prefect for a beginner like me I'm using the [official react website][l1] -working on react web app. i am making progress added main page and title bar, its going well react is much easier to use than angular.

### 19/10/19

- continuing work on the [user-login app tutorial][l2] added landing page, routes, 404 page and login page.

### 20/10/19

- started working on [new mern tutorial][l3]
- completed back-end section of the tutorial which now allows me to add new users to MongoDB using [jwt passport strategy][l4] and json json web-tokens to store encrypted passwords.

### 21/10/19

- continuing work on the [mern tutorial][l3], i have a login, and register page now i am planning to have the MERN tutorial finished by the end of the week or Monday at the latest.

### 22/10/19

- continued work on mern app finished the tutorial that i was working on and the app is working as expected.
- i want to start adding my own components to my app, such as mobile number page and user details, and more elements the the navbar. i haven't received my development board yet so i will continue on the web page till i receive that.

### 29/10/19

- Still working to allow users to add phone numbers to the database. the back end API is working a i can add new entries to MongoDB using post man and posting to the API. There is a bud at the moment that prevents the front-end web page from communicating with the back-end API.

- [x] Connect Front-end details page and get it communicating with back-end API.(complete by 08/11/19)

<kbd><strong>Bug:</strong> <del>details page unable to communicate with API</del> <strong>Solution</strong>: solution was found by testing API using post man to determine the the authenticator was not able to intemperate the number correctly when to was being sent form the front end   </kbd>

<kbd><strong>Bug:</strong> <del>unable to select region</del> <strong>solution:</strong> was to remove flag selection from the input and instead manually set the region to Ireland</kbd>

### 01/11/19

- finally got the API communicating with API. I'm now able to have users register log in and add phone numbers to MongoDB, this will allow me to pull user contact info to send users notifications when an event is triggered.
- I'm continuing work on the web page and I wan to add a list of the currently stored users that have phone numbers added

### 04/11/19

- added new component to display users that have added emergency contact info
- modified API to make calls to MongoDB and request users contact info, next step is to add a list on the numbers page that displays the currently stored user contact info.

### 08/11/19

- Final received my ATmega 324PB Xplaned Pro development board. I have set up my development environment using atmel studio to develop for this board. First thing i have done is run an example program that turns on an led when the onboard button is pressed, and that seems to work. Next step is to make sense of the API documentation for the board and get some of the other features working such as USART and test the GPIO functions iv given my self the rest of the week to play around with the board, then i will have to start on getting the I2C functions working and start getting reading from the fall detection sensor.

### 03/12/19

- Back working on the ATmega 324PB and i have managed to configure a new project with SPI and USART currently testing simple GPIO function such as turning leds on reading from switches and so on, next i will continue work on the SPI and start getting reading back from the accelerometer

### 20/01/20

- I have made a small amount of progress with the spi communication on the atmel 324\. but im not feeling that this is enough progress. I have decided to try instead the ESP32 development board and i seem to be making progress.

### 03/02/20

- Over the last two weeks I have been working more on the communication between the ESP32 and the ADXL345 in order to be able to detect falls, the ADXL345 and the ability to detect free fall velocity after being configured to do so i will be able to issue an interrupt to the ESP32 and then measure the time of the free fall and read the orientation of the sensor then establish if a fall has occurred. Over the last few weeks i have been having trouble with the technologies I chose initially, so i have chosen to switch gears and after some research and testing I have installed micro python on the ESP32 and i think this is the direction i will now take. I am no longer trying to use SPI communication but instead using i2c. for testing the ESP32 functions i have a direct communication between the board and my IDE called repl (Read–eval–print loop). this allows me to test my code without the need to compile and upload code every time I make a change. At the moment i have built a circuit to test the external hardware interrupt functions of the ESP32.over the next few weeks 03/02 till 17/02 i will focus on the configuration of the ADXL345 via i2c and begin testing.

### 04/04/20

- I have been continually working on the i2c communication and setup of the ADXL345 accelerometer and i still have not made progress on that side. To continue work i have gone back to the website, the one i had set up before used react and was quite complex and was build using online tutorials and example code, i have decided to scrap that site and make a new one using what i have learnt during cloud computing this year. the new site i still being worked on, but i have login working new users are able to register and i can display stored contacts. I will continue working on the website for a few days, and by monday i will go back to the ESP, Im having trouble with the spi so for now i want to focus on getting the ESP to fetch contact info from mongo db using an endpoint from my node webserver.

### 14/04/20

- 

#### ToDo

- #### mern web app

- [x] create back end (part 1 of tutorial)

- [x] create front end (part 2 of tutorial)

- [x] link react components using redux (part 3 of tutorial)

- [x] add more pages for adding user details such as phone number

- [x] add more elements to navbar

_(These items are currently on hold while I begin work on the ATmega 324BP)_

> - [ ] fix Nav bar(menu items disappear when resizing page)(This item is currently on hold while I begin work on the ATmega 324BP)
> - [ ] add table to display users that have added emergency contact details(This item is currently on hold while I begin work on the ATmega 324BP)

- [x] Test ATmega examples.

- [x] Test GPIO ports with my own functions.

- [ ] ~~Start working on SPI functions. (abandoned)~~

- [x] build physical circuit for testing hardware interrupts.

- [ ] configure ADXL345 for issuing interrupts on a free fall.

#### Project introduction

explanation of what my project is and my reason for choosing it.

#### Technology's used in my project

react, node , express, MongoDB (MERN). ATmega 324PB. analog devices accelerator ADXL345, GSM

#### Demo

MERN wep app atmega SPI

#### Project plan

OpenProject gant chart

[l1]: https://reactjs.org/ "react web page"
[l2]: https://serverless-stack.com/chapters/create-a-login-page.html "serverless website"
[l3]: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669 "new mern tutorial for authentication app"
[l4]: http://www.passportjs.org/packages/passport-jwt/?source=post_page-----c405048e3669---------------------- "description of jwt passport"

# Train Schedule

## The Challenge
Create a train scheduling app that allows users to:
1. View information about arriving trains, including Train Name, Destination, and Minutes Until Arrival.
2. Add new trains to the schedule and display that train on the page.
3. Keep track of the trains over multiple page refreshes.

## The Method
1. When a user completes the "Add Train" form, that new train and its data are stored to a Firebase database.
2. On value, those database items are retrieved from Firebase and displayed in the Train Schedule table. 
    Because this occurs on value, it happens once at page load (assuming there are trains), and again each time
    a new train is added.
3. Minutes Until Arrival is calculated using the arrival time of the first train and the frequency of arrivals. Both of 
    these values are required to add a train.
4. The Moment.js library is used to get the current time and calculate the moments until arrival, as well as arrival time.
    This library also assists with the display format of times.

## Technologies Used
1. HTML
2. CSS
3. Bootstrap
4. JS
5. Moment.js
6. jQuery
7. Firebase


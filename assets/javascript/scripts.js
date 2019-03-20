// Initialize firebase configuration...
var config = {
  apiKey: "AIzaSyBiFXfKWh2SpiukfxILNHYmU-2EvZzeY-w",
  authDomain: "train-scheduler-5845e.firebaseapp.com",
  databaseURL: "https://train-scheduler-5845e.firebaseio.com",
  projectId: "train-scheduler-5845e",
  storageBucket: "train-scheduler-5845e.appspot.com",
  messagingSenderId: "223228865618"
};
firebase.initializeApp(config);

// Assign a local variable reference to the firebase database
var database = firebase.database();

//   Build onclick for add train submit button
$('#add-train').on('click', function () {
  // Stop default refresh on submit
  event.preventDefault();

  // Save inputs as local variables
  var trainName = $('#train-name-input').val().trim();
  var destination = $('#destination-input').val().trim();
  var firstTrain = $('#first-train-input').val().trim();
  var frequency = $('#frequency-input').val().trim();

  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTrain);
  // console.log(frequency);

  // Create a new object filled with the user input from form
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  console.log(newTrain);

  // Push newTrain object to the database
  database.ref().push({ newTrain });

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});


// Create database event for adding a train to the database 
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store values as local variables... 
  var trainName = childSnapshot.val().newTrain.trainName;
  var destination = childSnapshot.val().newTrain.destination;
  var firstTrain = childSnapshot.val().newTrain.firstTrain;
  var frequency = childSnapshot.val().newTrain.frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Create a variable for calculated arrival time


  var newRow = $('<tr>').append(
    $("<td>").text(''),
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    // $("<td>").text(frequency)
  );

  $("#train-table > tbody").append(newRow);
});

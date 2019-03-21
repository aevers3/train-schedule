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

  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTrain);
  // console.log(frequency);




  // ******************** CALCULATED FIELDS (Next arrival time, minutes until next train) ********************

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // First train - push back 1 year so it's before the currentTime.
  console.log('FIRST TRAIN: ' + firstTrain);
  // ***** QUESTION for someone - In the line below, is 'HH:mm' used to 'catch' firstTrain in that format before converting to UNIX?
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log('FIRST TRAIN UNIX: ' + firstTrainConverted);

  // Difference between firstTrain and currentTime...
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log('DIFFTIME ' + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log('REMAINDER: ' + tRemainder);

  // Minutes until next train... Returns as number (console.log below combines it into string - don't be fooled.)
  var minutesTillTrain = frequency - tRemainder;
  console.log('MINUTES TILL TRAIN: ' + minutesTillTrain);

  var nextTrain = moment().add(minutesTillTrain, 'minutes');
  console.log('NEXT TRAIN: ' + moment(nextTrain).format("hh:mm"));



  // *********************** ADD TO TABLE ON SCREEN ***********************
  // Build new table row and append all of the <td>'s
  var newRow = $('<tr>').append(
    $("<td>").text(''),
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(moment(nextTrain).format('hh:mm')),
    $("<td>").text(minutesTillTrain),
  );

  // Append newly populated row to DOM.
  $("#train-table > tbody").append(newRow);

});


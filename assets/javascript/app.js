var config = {
  apiKey: "AIzaSyDkaLB3t0YwoZ9oGZXU6wU5EAxPGw-JO1s",
  authDomain: "trainscheduler-5f27a.firebaseapp.com",
  databaseURL: "https://trainscheduler-5f27a.firebaseio.com",
  projectId: "trainscheduler-5f27a",
  storageBucket: "trainscheduler-5f27a.appspot.com",
  messagingSenderId: "237555827812"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format('hh:mm a');
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    train: trainName,
    destination: destination,
    firstTrain: firstTrainTime,
    frequency: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train added! Choo Choo");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var firstTrainPretty = moment.unix(firstTrainTime).format("HHmm");

  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var minutesAway = diffTime % frequency;
  console.log(minutesAway);

  var tMinutesTillTrain = frequency - minutesAway;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)

  );
  $("#trains > tbody").append(newRow);
});
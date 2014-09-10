'use strict';

var totalCost = 0;
var hourlyCost = 0;

$(document).ready(function() {
  var timerDisplay = $('#meeting-timer');
  var attendeeList = $('#attendee-list');
  var addAttendeeBtn = $('#add-to-meeting');
  var toggle = $('#start-stop');

  initAttendeeList(attendeeList, addAttendeeBtn);
  initTimer(timerDisplay, toggle);
});

var initTimer = function(timerDisplay, timerToggle) {
  var timer = $.timer(function() {
    incrementTimer(timerDisplay);
  });

  timerDisplay.html('$' + totalCost);

  timer.set({ time: 1000, autostart: false});

  timerToggle.click(function() {
    if (timer.isActive) {
      timer.pause();
      $(this).html('Start Meeting');
    } else {
      timer.play();
      $(this).html('Pause Meeting');
    }
  });
}

var initAttendeeList = function(attendeeList, addAttendeeBtn) {
  addAttendeeBtn.click(function() {
    var attendee = $(this).parent().serializeArray(); 
    attendeeList.append('<li>' + attendee[0].value + ' / ' + parseFloat(attendee[1].value).toFixed(2) + '</li>');
    hourlyCost += parseFloat(attendee[1].value);
  });
}

var incrementTimer = function(timerDisplay) {
  totalCost += hourlyCost / 3600
  timerDisplay.html('$' + totalCost.toFixed(2));
}
'use strict';

var totalCost = 0;
var hourlyCost = 0;

$(document).ready(function() {
  var timerDisplay = $('#meeting-timer');
  var addAttendeeForm = $('#add-attendee-form');
  var attendeeList = $('#attendee-list');
  var addAttendeeBtn = $('#add-to-meeting');
  var toggle = $('#start-stop');

  initAttendeeList(attendeeList, addAttendeeBtn, addAttendeeForm);
  initTimer(timerDisplay, toggle);
  $('#att-name-input').focus();
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

var initAttendeeList = function(attendeeList, addAttendeeBtn, addAttendeeForm) {
  addAttendeeForm.bootstrapValidator({
    container: '#validate-messages',
    submitButtons: addAttendeeBtn,
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'Attendee must have a name.'
          }
        }
      },
      rate: {
        validators: {
          notEmpty: {
            message: 'Attendee must have a rate.'
          },
          numeric: {
            message: 'Rate must be a number.'
          }
        }
      }
    }
  })
  .on('success.form.bv', function(e) {
    e.preventDefault();
    recordAttendeeForm(attendeeList, addAttendeeBtn, addAttendeeForm);
  });
}

var recordAttendeeForm = function(attendeeList, addAttendeeBtn, addAttendeeForm) {
  var attendee = addAttendeeForm.serializeArray(); 
  attendeeList.append('<li>' + attendee[0].value + ' @ ' + parseFloat(attendee[1].value).toFixed(2) + '</li>');
  hourlyCost += parseFloat(attendee[1].value);
  
  addAttendeeForm[0].reset();
  addAttendeeForm.bootstrapValidator('resetForm');
  addAttendeeForm.bootstrapValidator('disableSubmitButtons', true);
  $('#att-name-input').focus();
}

var incrementTimer = function(timerDisplay) {
  totalCost += hourlyCost / 3600
  timerDisplay.html('$' + totalCost.toFixed(2));
}

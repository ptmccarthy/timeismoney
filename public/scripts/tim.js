'use strict';

var attendees = [];
var next_att_id = 0;
var totalCost = 0;
var hourlyCost = 0;
var elapsedTime = 0;


$(document).ready(function() {
  var timerDisplay = $('#meeting-cost');
  var elapsedDisplay = $('#elapsed-time');
  var addAttendeeForm = $('#add-attendee-form');
  var attendeeList = $('#attendee-list');
  var addAttendeeBtn = $('#add-to-meeting');
  var toggle = $('#start-stop');

  initAttendeeList(attendeeList, addAttendeeBtn, addAttendeeForm);
  initTimer(timerDisplay, elapsedDisplay, toggle);
  $('#att-name-input').focus();
});

var initTimer = function(timerDisplay, elapsedDisplay, timerToggle) {
  var timer = $.timer(function() {
    incrementTimer(timerDisplay, elapsedDisplay);
  });

  timerDisplay.html('$' + totalCost);
  elapsedDisplay.html('and has run for ' + elapsedTime.toHHMMSS());

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
  var attendee = generateAttendeeListItem(addAttendeeForm.serializeArray()); 
  attendees.push(attendee);

  hourlyCost += parseFloat(attendee.rate);

  repopulateAttendeeList(attendeeList);
  
  resetForm(addAttendeeForm, $('#att-name-input'));
}

var repopulateAttendeeList = function(attendeeList) {
  attendeeList.find('.attendee').remove();

  attendees.forEach(function(att) {
    attendeeList.append('<li class=attendee>' + att.name + ' @ ' + att.rate + '  <img src=/images/redx.png class=remove-att id = ' + att.id + '></li>');
  });

  attendeeList.find('.remove-att').click(function() {
    removeAttendee(this.id, attendeeList);
  });
}

var incrementTimer = function(timerDisplay, elapsedDisplay) {
  totalCost += hourlyCost / 3600
  elapsedTime += 1;
  timerDisplay.html('$' + totalCost.toFixed(2));
  elapsedDisplay.html('and has run for ' + elapsedTime.toHHMMSS());
}

var generateAttendeeListItem = function(serializedAttendeeForm) {
  var attendee = {};
  attendee.id = next_att_id;
  next_att_id += 1;
  attendee.name = serializedAttendeeForm[0].value.toString();
  attendee.rate = parseFloat(serializedAttendeeForm[1].value).toFixed(2);

  return attendee;
}

var resetForm = function(form, newFocus) {
  form[0].reset();
  form.bootstrapValidator('resetForm');
  form.bootstrapValidator('disableSubmitButtons', true);
  newFocus.focus();
}

var removeAttendee = function(attendee_id, attendeeList) {
  for (var i = 0; i < attendees.length; i++) {
    if (attendees[i].id == attendee_id) {
      hourlyCost -= attendees[i].rate
      attendees.splice(i, 1);    
    }
  }

  repopulateAttendeeList(attendeeList);
}

Number.prototype.toHHMMSS = function () {
    var seconds = Math.floor(this),
        hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
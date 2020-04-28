var subjectholder = document.getElementById("event-subject");
var clientName = document.getElementById("client-name");
var datalist = document.getElementById("attendees");
var datalistValue = document.getElementById("attendees-search");
var body = document.getElementById("event-content");
var contactResponse;
var profileResponse;

//subject line for calendar event
clientName.addEventListener("input", function (event) {
  selIndex = docType.selectedIndex;
  console.log(docType);
  console.log(clientName.value);
  var subjectText = clientName.value + " " + docType;
  subjectholder.value = subjectText;
  sidebarSubject.innerHTML=subjectholder.value;

});

subjectholder.addEventListener("input",function(event){
sidebarSubject.innerHTML=subjectholder.value;
});

body.addEventListener("input",function(){
  sidebarContent.innerHTML=body.value;
})

//endpoints for various API calls
const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphCalendarEndpointOne:
    "https://graph.microsoft.com/v1.0/me/calendar/events",
  graphPeopleEndpoint: "https://graph.microsoft.com/v1.0/me/people",
  graphContactsEndpoint:
    "https://graph.microsoft.com/v1.0/me/contacts?$select = displayName,emailAddresses",
};

//event template
const event = {
  subject: subjectholder.value,
  reminderMinutesBeforeStart: "",
  body: {
    contentType: "HTML",
    content: body.value,
  },
  start: {
    dateTime: "2020-05-15T12:00:00",
    timeZone: "Eastern Standard Time",
  },
  end: {
    dateTime: "2020-05-15T14:00:00",
    timeZone: "Eastern Standard Time",
  },
  location: {
    displayName: null,
  },
  attendees: [
    {
      emailAddress: {
        address: "kwvembu@gmail.com",
        name: "Vembushri RM",
      },
      type: "required",
    },
  ],
};

//append attendees to this array and then set the event attendees to this value
attendeesForEvent = [
  //this is the default attendee for each event
  //   {emailAddress: {
  //   address : "cdeslosges@desloges.ca",
  //   name: "Chantal Desloges"
  // },
  // type: "required"
  // },
  {
    emailAddress: {
      address: "ronenshakes@yahoo.com",
      name: "Ronen LeRokh",
    },
    type: "required",
  },
];

//CALL WITH THE ADD BUTTON FOR DATALIST
function addAttendee() {
  selectedName = datalistValue.value;
  console.log(selectedName);
  attendee = {
    emailAddress: {
      address: namesAndEmails[selectedName],
      name: selectedName,
    },
    type: "required",
  };
  attendeesForEvent.push(attendee);
  console.log(
    "Attendee added! Name: " +
      selectedName +
      " Email: " +
      namesAndEmails[selectedName]
  );

  var tag = document.createElement("p");
  var text = document.createTextNode(selectedName+": "+namesAndEmails[selectedName]+"\n");
  tag.appendChild(text);
  sidebarAttendees.appendChild(tag);
 
}

/*
Attendees for sidebar should look like this:
Attendees:
Ronen: rrok@email
Vembu: vembu@email
*/

//key value pairs of names and emails of the contacts
var namesAndEmails = {
  // "vembu":"kwvem@mails",
  // "ronen" : "ronen@mail"
};

//create key-value pairs to store names and emails
//this populates namesAndEmails
function processResponse() {
  for (let i = 0; i < contactResponse.value.length; i++) {
    key = contactResponse.value[i].displayName;
    value = contactResponse.value[i].emailAddresses[0].name;
    Object.assign(namesAndEmails, { [key]: value });
  }
  console.log(namesAndEmails);
}

//used to call seeProfile()
function callMSGraph(theUrl, accessToken) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      profileResponse = JSON.parse(xmlHttp.response);
      console.log(xmlHttp.response);
      console.log(JSON.parse(xmlHttp.response));
      processProfile();
      return JSON.parse(xmlHttp.response);
    }
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.setRequestHeader("Authorization", "Bearer " + accessToken);
  xmlHttp.setRequestHeader("Content-Type", "application/json");

  xmlHttp.send();
}

//calls API to get list of user's contacts
function callMSGraphPeople(theUrl, accessToken) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xmlHttp.response);
      console.log(typeof JSON.parse(xmlHttp.response));
      contactResponse = JSON.parse(xmlHttp.response);
      datalistEntry();
      return JSON.parse(xmlHttp.response);
    }
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.setRequestHeader("Authorization", "Bearer " + accessToken);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send();
}

//Function that sends the event based on the reminder settings
function submitButton(theUrl, token) {
  event.subject = subjectholder.value;
  event.body.content = body.value;
  event.attendees = attendeesForEvent;
  event.start.dateTime = finalString;
  event.end.dateTime = finalString;
  console.log(event);
  swal("Event Added!","Come back soon!", "success");

  if (check("2-days")) {
    // event.start.dateTime = realDateCalculation(-2, subDateString);
    // event.end.dateTime = realDateCalculation(-2, subDateString);
    event.isReminderOn = true;
    event.reminderMinutesBeforeStart = 2880;

    // viewCalendar();
  }
  if (check("7-days")) {
    // event.start.dateTime = realDateCalculation(-7, subDateString);
    // event.end.dateTime = realDateCalculation(-7, subDateString);
    event.isReminderOn = true;
    event.reminderMinutesBeforeStart = 10080;
    // viewCalendar();
  }
  if (check("14-days")) {
    // event.start.dateTime = realDateCalculation(-14, subDateString);
    // event.end.dateTime = realDateCalculation(-14, subDateString);
    event.isReminderOn = true;
    event.reminderMinutesBeforeStart = 20160;
    // viewCalendar();
  }

  if (check("21-days")) {
    // event.start.dateTime = realDateCalculation(-21, subDateString);
    // event.end.dateTime = realDateCalculation(-21, subDateString);
    event.isReminderOn = true;
    event.reminderMinutesBeforeStart = 30240;
    // viewCalendar();
  }

  callMSGraph2(theUrl, token);
}

//used to create calendar events
function callMSGraph2(theUrl, token) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (this.readystate == 4 && this.status == 201) {
      console.log(xmlHttp.responseText);
    }
  };

  xmlHttp.open("POST", theUrl, true);
  xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify(event));
}

function lookResponse() {
  console.log(contactResponse);
}

//adds user's contacts to datalist options
function datalistEntry() {
  var len = datalist.length;
  for (let i = 0; i < len; i++) {
    documents.removeChild(datalist.options[0]);
  }
  for (let i = 0; i < contactResponse.value.length; i++) {
    var opt = document.createElement("option");
    opt.appendChild(
      document.createTextNode(contactResponse.value[i].displayName)
    );
    opt.value = contactResponse.value[i].displayName;
    datalist.appendChild(opt);
  }
  processResponse();
}

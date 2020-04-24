var subjectholder = document.getElementById("event-subject"); 
var clientName = document.getElementById("client-name");
var datalist = document.getElementById("attendees");
var thisResponse;

//subject line for calendar event
clientName.addEventListener("input",function(event){
  selIndex = docType.selectedIndex;
  console.log(docType);
  console.log(clientName.value);
  var subjectText = clientName.value + " " + docType;
  subjectholder.value = subjectText;

})


//endpoints for various API calls
const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphCalendarEndpointOne: "https://graph.microsoft.com/v1.0/me/calendar/events",
 graphPeopleEndpoint : "https://graph.microsoft.com/v1.0/me/people",
 graphContactsEndpoint : "https://graph.microsoft.com/v1.0/me/contacts?$select = displayName,emailAddresses"
};



//event template 
const event = JSON.stringify({
  subject: "Let's go for lunch",
  body: {
    contentType: "HTML",
    content: "Does mid month work for you?",
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
  attendees: [{
    emailAddress : {
      address : "kwvembu@gmail.com",
      name: "Vembushri RM"
    }, 
    type: "required"
  }]
});

//used to call seeProfile()
function callMSGraph(theUrl, accessToken){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      return(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.setRequestHeader('Authorization','Bearer ' + accessToken);
  xmlHttp.send();
}

//calls API to get list of user's contacts
function callMSGraphPeople(theUrl, accessToken){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(xmlHttp.response);
      console.log(typeof JSON.parse(xmlHttp.response));
      thisResponse = JSON.parse(xmlHttp.response);
      datalistEntry();
      return JSON.parse(xmlHttp.response);
    }
  }
  xmlHttp.open("GET",theUrl,true);
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send();
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
  xmlHttp.send(event);
}

function lookResponse(){
  console.log(thisResponse);
}

//adds user's contacts to datalist options
function datalistEntry() {
  var len = datalist.length;
  for (let i = 0; i < len; i++) {
    documents.removeChild(datalist.options[0]);
  }
  for (let i = 0; i < thisResponse.value.length; i++) {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(thisResponse.value[i].displayName));
    opt.value = thisResponse.value[i].displayName;
    datalist.appendChild(opt);
  }
}

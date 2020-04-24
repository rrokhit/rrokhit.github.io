var subjectholder = document.getElementById("event-subject"); 
var clientName = document.getElementById("client-name");
var thisResponse;

clientName.addEventListener("input",function(event){
  selIndex = docType.selectedIndex;
  console.log(docType);
  console.log(clientName.value);
  var subjectText = clientName.value + " " + docType;
  subjectholder.value = subjectText;

})



const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphCalendarEndpointOne: "https://graph.microsoft.com/v1.0/me/calendar/events",
 graphPeopleEndpoint : "https://graph.microsoft.com/v1.0/me/people",
 graphContactsEndpoint : "https://graph.microsoft.com/v1.0/me/contacts?$select = displayName,emailAddresses"
};




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


// function callMSGraph(endpoint, token) {
//   const headers = new Headers();
//   const bearer = `Bearer ${token}`;

//   headers.append("Authorization", bearer);

//   const options = {
//     method: "GET",
//     headers: headers,
//   };

//   console.log("request made to Graph API at: " + new Date().toString());
//   console.log("endpoint = " + endpoint);
//   console.log("options = " + options.method + " and  " + options.headers);
//   fetch(endpoint, options)
//     .then((response) => {
//       response.json()
//       console.log(response.json());
//     })
//     // .then((response) => callback(response, endpoint))
//     .catch((error) => console.log(error));
// }

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

function callMSGraphPeople(theUrl, accessToken){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(xmlHttp.response);
      console.log(typeof JSON.parse(xmlHttp.response));
      thisResponse = JSON.parse(xmlHttp.response);
      console.log(thisResponse);
      return JSON.parse(xmlHttp.response);
    }
  }
  xmlHttp.open("GET",theUrl,true);
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send();
}

function callMSGraph2(theUrl, token) {

  // const options = {
  //   authProvider,
  // }

  // const client = Client.init(options);
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


var loginButton = document.getElementById("login-button");
var contactsResponse;
var datalist = document.getElementById("attendees");

const msalConfig = {
  auth: {
    clientId: "ae367a9f-8178-4ab8-82e0-381c6e5e4ab0", // this is a fake id
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "https://rrokhit.github.io/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);
// const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(myMSALObj, AccessTokenRequest.scopes);
const loginRequest = {
  scopes: ["openid", "profile", "User.Read", "Organization.ReadWrite.All"],
  // prompt : "select_account",
};

myMSALObj.handleRedirectCallback((error, response) => {
  console.log(error);
  console.log(response);
});

// myMSALObj
//   .loginRedirect(loginRequest)
//   .then((loginResponse) => {
//     //Login Success callback code here
//     console.log(loginResponse);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
const AccessTokenRequest = {
  scopes: ["Contacts.Read","Contacts.ReadWrite","User.Read.All", "Group.ReadWrite.All", "Calendars.ReadWrite","Mail.ReadWrite", "People.Read.All","People.Read","Contacts.Read"],
};

// myMSALObj
//   .acquireTokenSilent(tokenRequest)
//   .then((tokenResponse) => {
//     // Callback code here
//     console.log(tokenResponse.accessToken);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

function signIn() {
  //console.log(myMSALObj);
  myMSALObj
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      console.log(Object.keys(loginResponse));
     
    })
    .catch((error) => {
      console.log(error);
    });
}


function signOut() {
  myMSALObj.logout();
}
function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      console.log(error);
      console.log("silent token acquisition fails. acquiring token using popup");

      // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
    });
}

function getPeople(){
  if(myMSALObj.getAccount()){
    getTokenPopup(AccessTokenRequest)
    .then((response) =>{
      callMSGraphPeople(
        graphConfig.graphContactsEndpoint,
        response.accessToken
        );
    })
    .then((response) =>{
//       console.log(response.text);
//       console.log(JSON.stringify(response));
//       console.log(JSON.parse(response));
    })
    .catch((error) => {
      console.log(error);
    })
    
  }
}

function seeProfile() {
  
  // const account = myMSALObj.getAccount();
  // console.log(account.userName);
  // console.log(account.accountIdentifier);
  // console.log(callMSGraph(graphConfig.graphMeEndpoint,))
  
  if (myMSALObj.getAccount()) {
    getTokenPopup(loginRequest)
      .then((response) => {
        console.log(response.accessToken);
        callMSGraph(
          graphConfig.graphMeEndpoint,
          response.accessToken
        );

      }).then((response) =>{
        var text = document.createElement('P');
        text.innerHTML = response;
        document.body.appendChild(text);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function viewCalendar(){
  if(myMSALObj.getAccount()){
    getTokenPopup(AccessTokenRequest)
    .then((response) =>{
      callMSGraph2(
        graphConfig.graphCalendarEndpointOne, response.accessToken
      )
    }).catch((error) => {
      console.log(error);
    })
  }
}


function datalistEntry() {
  var len = datalist.length;
  for (let i = 0; i < len; i++) {
    documents.removeChild(datalist.options[0]);
  }
  for (let i = 0; i < contactsResponse.value.length; i++) {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(contactsResponse.value[i].name));
    opt.value = contactsResponse.value[i].name;
    datalist.appendChild(opt);
  }
}

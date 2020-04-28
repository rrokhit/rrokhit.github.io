var loginButton = document.getElementById("login-button");
var contactsResponse;
var bannerName = document.getElementById("banner-name");
var bannerEmail = document.getElementById("banner-email");
var bannerLogin = document.getElementById("banner-logged-in");

//initialize MSAL based on AzureAD configuration
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

//Scopes to login
const loginRequest = {
  scopes: ["openid", "profile", "User.Read", "Organization.ReadWrite.All"],
};

myMSALObj.handleRedirectCallback((error, response) => {
  console.log(error);
  console.log(response);
});

//Scopes to gain access token and get user info
const AccessTokenRequest = {
  scopes: [
    "Contacts.Read",
    "Contacts.ReadWrite",
    "User.Read.All",
    "Group.ReadWrite.All",
    "Calendars.ReadWrite",
    "Mail.ReadWrite",
    "People.Read.All",
    "People.Read",
    "Contacts.Read",
  ],
};

//function to sign in
function signIn() {
  myMSALObj
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      console.log(Object.keys(loginResponse));
      getPeople();
      seeProfile();
      loginButton.innerHTML = "Log out";

    })
    .catch((error) => {
      console.log(error);
    });
}

loginButton.addEventListener("click", function (event) {
  if (!myMSALObj.getAccount()) {
    //this means that the user is not logged in
    signIn();
  } else {
    //this means user is already logged in
    signOut();
    
  }
});

//function to sign out
function signOut() {
  loginButton.innerHTML = "Login to Outlook";
  bannerName.innerHTML = "";
   bannerEmail.innerHTML = "";
   bannerLogin.innerHTML = "Not cuurently logged in";
  myMSALObj.logout();
}

//fuction to aquire token
function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request).catch((error) => {
    console.log(error);
    console.log("silent token acquisition fails. acquiring token using popup");

    // fallback to interaction when silent call fails
    return myMSALObj
      .acquireTokenPopup(request)
      .then((tokenResponse) => {
        return tokenResponse;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

//function to get user's contacts
function getPeople() {
  var theResponse;
  if (myMSALObj.getAccount()) {
    getTokenPopup(AccessTokenRequest).then((response) => {
      theResponse = callMSGraphPeople(
        graphConfig.graphContactsEndpoint,
        response.accessToken
      );
    });
  }
}



//function to get profile
function seeProfile() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(AccessTokenRequest)
      .then((response) => {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken);
        // profileButton.classList.add("d-none");
        // mailButton.classList.remove("d-none");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function processProfile(){
  
  bannerName.innerHTML=profileResponse.displayName;
  bannerEmail.innerHTML = profileResponse.userPrincipalName;

}


//function to add calendar events
function viewCalendar() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(AccessTokenRequest)
      .then((response) => {
        submitButton(
          graphConfig.graphCalendarEndpointOne,
          response.accessToken
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSIsImtpZCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSJ9.eyJhdWQiOiJlZjFkYTlkNC1mZjc3LTRjM2UtYTAwNS04NDBjM2Y4MzA3NDUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYTE1ZDY5Mi1lOWM3LTQ0NjAtYTc0My0yOWYyOTUyMjIyOS8iLCJpYXQiOjE1MzcyMzMxMDYsIm5iZiI6MTUzNzIzMzEwNiwiZXhwIjoxNTM3MjM3MDA2LCJhY3IiOiIxIiwiYWlvIjoiQVhRQWkvOElBQUFBRm0rRS9RVEcrZ0ZuVnhMaldkdzhLKzYxQUdyU091TU1GNmViYU1qN1hPM0libUQzZkdtck95RCtOdlp5R24yVmFUL2tES1h3NE1JaHJnR1ZxNkJuOHdMWG9UMUxrSVorRnpRVmtKUFBMUU9WNEtjWHFTbENWUERTL0RpQ0RnRTIyMlRJbU12V05hRU1hVU9Uc0lHdlRRPT0iLCJhbXIiOlsid2lhIl0sImFwcGlkIjoiNzVkYmU3N2YtMTBhMy00ZTU5LTg1ZmQtOGMxMjc1NDRmMTdjIiwiYXBwaWRhY3IiOiIwIiwiZW1haWwiOiJBYmVMaUBtaWNyb3NvZnQuY29tIiwiZmFtaWx5X25hbWUiOiJMaW5jb2xuIiwiZ2l2ZW5fbmFtZSI6IkFiZSAoTVNGVCkiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMjIyNDcvIiwiaXBhZGRyIjoiMjIyLjIyMi4yMjIuMjIiLCJuYW1lIjoiYWJlbGkiLCJvaWQiOiIwMjIyM2I2Yi1hYTFkLTQyZDQtOWVjMC0xYjJiYjkxOTQ0MzgiLCJyaCI6IkkiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJsM19yb0lTUVUyMjJiVUxTOXlpMmswWHBxcE9pTXo1SDNaQUNvMUdlWEEiLCJ0aWQiOiJmYTE1ZDY5Mi1lOWM3LTQ0NjAtYTc0My0yOWYyOTU2ZmQ0MjkiLCJ1bmlxdWVfbmFtZSI6ImFiZWxpQG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJGVnNHeFlYSTMwLVR1aWt1dVVvRkFBIiwidmVyIjoiMS4wIn0.D3H6pMUtQnoJAGq6AHd





var loginButton = document.getElementById("login-button");

const msalConfig = {
  auth: {
    clientId: "ae367a9f-8178-4ab8-82e0-381c6e5e4ab0", // this is a fake id
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://rrokhit.github.io/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);
const loginRequest = {
  scopes: ["openid", "profile", "User.Read.All"],
  prompt : "select_account",
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
  scopes: ["openid", "profile", "User.Read.All"],
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
      return myMSALObj.acquireTokenSilent(AccessTokenRequest);
      // if (myMSALObj.getAccount()) {
      //   showWelcomeMessage(myMSALObj.getAccount());
      // }
    }).then((accessTokenResponse)=>{
      const token = accessTokenResponse.accessToken;
      console.log(token);
    })
    .catch((error) => {
      if(error.name === "InteractionRequiredAuthError"){
        myMSALObj.acquireTokenPopup(AccessTokenRequest)
        .then((accessTokenResponse)=>{
          callMSGraph(endpoint, accessTokenResponse);
        }).catch((error)=>{
          console.log(error);

        })
      }
    });
}

function signOut() {
  myMSALObj.logout();
}

function getTokenPopup(tokenRequest) {
  return myMSALObj.acquireTokenSilent(tokenRequest).catch((error) => {
    console.log(error);
    console.log("silent token acquisition fails. acquiring token using popup");

    // fallback to interaction when silent call fails
    return myMSALObj
      .acquireTokenPopup(tokenRequest)
      .then((tokenResponse) => {
        return tokenResponse;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}


function seeProfile() {
  
  // const account = myMSALObj.getAccount();
  // console.log(account.userName);
  // console.log(account.accountIdentifier);
  // console.log(callMSGraph(graphConfig.graphMeEndpoint,))
  
  if (myMSALObj.getAccount()) {
    getTokenPopup(AccessTokenRequest)
      .then((response) => {
        callMSGraph(
          graphConfig.graphMeEndpoint,
          response.accessToken
        );

      })
      .catch((error) => {
        console.log(error);
      });
  }
}

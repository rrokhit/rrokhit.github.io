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
  scopes: ["openid", "profile", "User.Read"],
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
const tokenRequest = {
  scopes: ["openid", "profile", "User.Read"],
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
  myMSALObj
    .loginRedirect(loginRequest)
    .then((loginResponse) => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);

      if (myMSALObj.getAccount()) {
        showWelcomeMessage(myMSALObj.getAccount());
      }
    })
    .catch((error) => {
      console.log(error);
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
  if (myMSALObj.getAccount()) {
    getTokenPopup(loginRequest)
      .then((response) => {
        callMSGraph(
          graphConfig.graphMeEndpoint,
          response.accessToken,
          updateUI
        );
        profileButton.classList.add("d-none");
        mailButton.classList.remove("d-none");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

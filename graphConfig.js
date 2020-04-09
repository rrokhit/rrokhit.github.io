const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.comv1.0/me",
  graphMailEndpoint: "https://graph.microsoft.comv1.0/me/messages",
};

function callMSGraph(endpoint, token) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  console.log("request made to Graph API at: " + new Date().toString());
  console.log("endpoint = " + endpoint);
  console.log("options = " + options.method + " and  " + options.headers);
  fetch(endpoint, options)
    .then((response) => {
      response.json()
      console.log(response.json());
    })
    // .then((response) => callback(response, endpoint))
    .catch((error) => console.log(error));
}

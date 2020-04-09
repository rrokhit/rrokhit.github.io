const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
};

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
      console.log("success");
    }
  }
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.setRequestHeader('Authorization','Bearer' + accessToken);
  xmlHttp.send();
}

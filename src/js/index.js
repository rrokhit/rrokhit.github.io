//Guap Software
var inputvalue = document.getElementById("date-selector");
var radioResponse = document.getElementsByName("initial-menu");
var isChecked = document.querySelector("input[name=initial-menu]:checked");
var documents = document.getElementById("documents");
var dateName = document.getElementById("date-name");
var date;
var docType;
var finalString;
var subDate = document.getElementById("due-date");
var subDateString;
var sidebarSubject = document.getElementById("sidebar-subject");
var sidebarDate = document.getElementById("sidebar-date");
var sidebarAttendees = document.getElementById("sidebar-attendees");
var sidebarContent = document.getElementById("sidebar-content");
var clearButton = document.getElementById("clear-button");


//Document list for IRB documents
documentListIRB = [
  "Please Select:",
  "Disclosure (IAD)",
  "Notice of Appeal (IAD)",
  "Disclosure (RPD)",
  "Notice of Appeal (RAD)",
  "Appeal Record",
];

//Document list for FC documents
documentListFC = [
  "Please Select:",
  "Application for Leave and Judicial Review (Domestic)",
  "Application for Leave and Judicial Review (International)",
  "Applicant's Record",
  "Affidavits and Memorandum",
  "Reply Memorandum",
  "Book of Authorities",
];

//Gets date from date box
function getDate() {
  var dateControl = document.querySelector('input[type="date"]');
  date = dateControl.value;
  console.log(date);
}

//Shows FC documents in drop-down menu
function documentsFC() {
  var len = documents.length;
  for (let i = 0; i < len; i++) {
    documents.removeChild(documents.options[0]);
  }
  for (let i = 0; i < documentListFC.length; i++) {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(documentListFC[i]));
    opt.value = documentListFC[i];
    documents.appendChild(opt);
  }
}

//Shows IRB documents in drop-down menu
function documentsIRB() {
  var len = documents.length;
  for (let i = 0; i < len; i++) {
    documents.removeChild(documents.options[0]);
  }

  for (let i = 0; i < documentListIRB.length; i++) {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(documentListIRB[i]));
    opt.value = documentListIRB[i];
    documents.appendChild(opt);
  }
}

//Dynamically changes drop-down menu to IRB or FC documents
for (i = 0; i < radioResponse.length; i++) {
  radioResponse[i].addEventListener("change", function (event) {
    if (this.value == "IRB") {
      documentsIRB();
    } else {
      documentsFC();
    }
  });
}

//what to do if docType = something
function disclosure() {
  dateName.innerHTML = "Date of hearing: ";
}

function noticeOfAppeal() {
  dateName.innerHTML = "Date refusal received: ";
}

function applicationFLJR() {
  dateName.innerHTML = "Date refusal received ";
}

function applicationRecordNoNine() {
  dateName.innerHTML = "Date AFLJR sent: ";
}

function applicationRecordWithNine() {
  dateName.innerHTML = "Date Rule 9 received: ";
}

function replyMemo() {
  dateName.innerHTML = "Date FC memo received: ";
}

function appealRecord() {
  dateName.innerHTML = "Date notice of appeal was filed: ";
}

//Saves value of DocType
documents.addEventListener("change", function (event) {
  docType = event.target.value;
  console.log(docType);
  if (docType == "Disclosure (IAD)" || docType == "Disclosure (RPD)") {
    console.log(docType);
    disclosure();
  } else if (
    docType == "Notice of Appeal (IAD)" ||
    docType == "Notice of Appeal (RAD)"
  ) {
    noticeOfAppeal();
  } else if (
    docType == "Application for Leave and Judicial Review (Domestic)" ||
    docType == "Application for Leave and Judicial Review (International)"
  ) {
    applicationFLJR();
  } else if (docType == "Applicant's Record (No Rule 9)") {
    applicationRecordNoNine();
  } else if (docType == "Applicant's Record (With Rule 9)") {
    applicationRecordWithNine();
  } else if (
    docType == "Reply Memorandum" ||
    docType == "Affidavits and Memorandum"
  ) {
    replyMemo();
  } else if (docType == "Appeal Record") {
    appealRecord();
  }
});

function check(id) {
  return document.getElementById(id).checked;
}

inputvalue.addEventListener("change", function (event) {
  date = inputvalue.value;
  //date = date.split("-");
  //dateConvert();
  console.log(date);
  dateCalculation();
  // document.getElementById("date-form").submit();
});

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function dateConvert(string) {
  string = string.split("-");
  for (let x = 0; x < string.length; x++) {
    if (string[x] < 10) {
      string[x] = "0" + string[x];
    }
    string[x] = "" + string[x];
  }
  string = string.join("-");
  return string;
}

//dateTime: "2020-05-15T12:00:00",
//20 days = 1728000000 milliseconds
//30 days = 2592000000 milliseconds
function dateCalculation() {
  if (docType == "Disclosure (IAD)") {
    //for disclosure IAD, it is due 20 days before hearing
    //inputDate is the date of hearing
    finalString = realDateCalculation(-20, date);
    console.log(finalString);
  } else if (docType == "Notice of Appeal (IAD)") {
    //notice of appeal must be filed 30 days after refusal
    //input date is date of refusal
    finalString = realDateCalculation(30, date);
    console.log(finalString);
  } else if (docType == "Disclosure (RPD)") {
    //disclosure RPD is due 10 days before hearing
    //input date is date of hearing
    finalString = realDateCalculation(-10, date);
    console.log(finalString);
  } else if (docType == "Notice of Appeal (RAD)") {
    //notice of appeal RAD must be filed 15 days after refusal
    //input date is date of refusal
    finalString = realDateCalculation(15, date);
    console.log(finalString);
  } else if (docType == "Appeal Record") {
    //idk what the appeal record is tbh
    //i think input date is date of refusal
    finalString = realDateCalculation(180, date);
    console.log(finalString);
  } else if (
    docType == "Application for Leave and Judicial Review (Domestic)"
  ) {
    //AFLJR(domestic) is due 15 days after refusal
    //input date is date of refusal
    finalString = realDateCalculation(15, date);
    console.log(finalString);
  } else if (
    docType == "Application for Leave and Judicial Review (International)"
  ) {
    //AFLJR (intl) is due 60 days after refusal
    //input date is date of refusal
    finalString = realDateCalculation(60, date);
    console.log(finalString);
  } else if (docType == "Applicant's Record (No Rule 9)") {
    //Applicants record is due 30 days after AFLJR is sent
    //input date is date AFLJR sent
    finalString = realDateCalculation(30, date);
    console.log(finalString);
  } else if (docType == "Applicant's Record (With Rule 9)") {
    //Applicant's record is due 40 days after rule 9 received
    //input date is date rule 9 received
    finalString = realDateCalculation(40, date);
    console.log(finalString);
  } else if (docType == "Reply Memorandum") {
    //reply memo is sent 10 days after FC memo
    // input date is when FC memo is received
    finalString = realDateCalculation(10, date);
    console.log(finalString);
  }
  subDate.value = dateConvert(subDateString);
  var sdValue = subDate.value;
  var tempDate = new Date(sdValue);
  tempDate = addDays(tempDate,1);
  sidebarDate.innerHTML = days[tempDate.getDay()]+", "+months[tempDate.getMonth()] + " "+ (tempDate.getDate()) + ", " + tempDate.getFullYear();
}

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function realDateCalculation(interval, funcDate) {
  var inputDate = new Date(funcDate);
  inputDate.setDate(inputDate.getDate() + 1);
  console.log(inputDate);
  var outputDate = addDays(inputDate, interval);
  console.log(outputDate);
  if (outputDate.getDay() == 0) {
    outputDate = addDays(outputDate, 1);
  } else if (outputDate.getDay() == 6) {
    outputDate = addDays(outputDate, -1);
  }
  console.log("after checking fo weekend: " + outputDate);
  subDateString =
    outputDate.getFullYear() +
    "-" +
    (outputDate.getMonth() + 1) +
    "-" +
    outputDate.getDate();
  finalString = subDateString + "T12:00:00";
  return finalString;
}

// date : "2020-03-14"
valuesIRB = {
  "Disclosure (IAD)": 20,
  "Notice of Appeal (IAD)": 30,
  "Disclosure (RPD)": 10,
  "Notice of Appeal (RAD)": 15,
};

documentListFC = [
  "Please Select:",
  "Application for Leave and Judicial Review (Domestic)",
  "Application for Leave and Judicial Review (International)",
  "Applicant's Record (No Rule 9)",
  "Applicant's Record (With Rule 9)",
  //"Affidavits and Memorandum",
  "Reply Memorandum",
  // "Book of Authorities"
];

function hello(){
  subDate.value = null;
  subjectholder.value ="";
  body.value = "";
  clientName.value ="";
  //replace this with default contact
  atendeesForEvent = [{
    emailAddress: {
      address: "ronenshakes@yahoo.com",
      name: "Ronen LeRokh",
    },
    type: "required",
  }];
  console.log(reminderButton);
  for (let i = 0; i < reminderButton.length; i ++) {
      reminderButton[i].checked = false;
  }
  datalistValue.value="";
  sidebarSubject.innerHTML = "Event Subject";
  sidebarContent.innerHTML = "Event Content";
  sidebarAttendees.innerHTML= "Attendees: \n"
  console.log(event);
}

// clearButton.addEventListener("click", clear());

//function to clear event and begin anew
function clear(){
  console.log("Something happened!");
  subDate.value = null;
  subjectholder.value ="";
  body.value = "";
  clientName.value ="";
  //replace this with default contact
  atendeesForEvent = [{
    emailAddress: {
      address: "ronenshakes@yahoo.com",
      name: "Ronen LeRokh",
    },
    type: "required",
  }];
  const button = reminderButton.find(button => button.checked);
  button.checked = false;
}

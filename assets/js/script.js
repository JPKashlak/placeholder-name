var userInput = document.getElementById("zip-field");
var errorMsg =  document.getElementById('error');
var covidCardTitle = document.getElementById("covid");
var repCardTitle =  document.getElementById('rep');

function validateForm() {
  
  // show error message if incorrect zipcode input
  var charCount = JSON.stringify(userInput.value).length - 2;

  if (charCount != 5 || NaN) {
    userInput.classList.add("is-danger");
    errorMsg.innerHTML="Zip code must be 5 digits";
  } else {
    displayData();
  }
}

function displayData() {

  // use the user input to return the county name
  userZip = JSON.stringify(userInput.value);
  fetch("http://dev.virtualearth.net/REST/v1/Locations?postalCode=" + userZip + "&key=Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0").then(function(response) {
    response.json().then(function(data) {
      var countyName = data.resourceSets[0].resources[0].address.adminDistrict2;
      covidCardTitle.innerHTML= countyName + " Covid Data";
      repCardTitle.innerHTML= countyName + " Politican Info";

  // show the covid and politican cards
  $("div").removeClass("hidden");
    });
  });
}
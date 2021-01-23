var userInput = document.getElementById("zip-field");
var errorMsg =  document.getElementById('error');

// show error message if incorrect zipcode input
function validateForm() {
  var x = JSON.stringify(userInput.value).length - 2;
  
  if (x != 5 || NaN) {
    userInput.classList.add("is-danger");
    errorMsg.innerHTML="Zip code must be 5 digits";
  }
  
}

fetch("http://dev.virtualearth.net/REST/v1/Locations?postalCode=78721&key=Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0").then(function(response) {
  response.json().then(function(data) {
    console.log(data.resourceSets[0].resources[0].address.adminDistrict2);
  });
});
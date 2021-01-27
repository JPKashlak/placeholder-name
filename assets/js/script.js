var config = {
  virtualEarthKey: "Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0",
  zipCodeKey1: "3gViGaWo0FXAWpATeUncO3LrgOb7olNRh6WyOq1qm7n1rvBkW5QEdo7ajb8GqS3o",
  openStatesKey: "72659b34-798d-4441-b6ee-c86ef9973ebb"
}


var repTitle =  document.getElementById('nameData');
var zipInput = document.querySelector("#inputForm");
var zipEntry = document.querySelector("#zip-field");
var virtualEarthKey = config.virtualEarthKey;
var zipCodeKey1 = config.zipCodeKey1;
var openStatesKey = config.openStatesKey;





// display data takes argument for user zip localStorage.setItem(userZip)


// get valid zip code from user
function validateForm() {

  var charCount = JSON.stringify(zipEntry.value).length - 2;
  var userZip = JSON.stringify(zipEntry.value);

  if (charCount != 5 || NaN) {
    zipEntry.classList.add("is-danger");
    errorMsg.innerHTML="Zip code must be 5 digits";
  } else {
    displayData(userZip);
  }
}

function displayData() {
  // use the user input to return the county name
  userZip = JSON.stringify(zipInput.value);

  // show the covid and politican cards
  $("div").removeClass("hidden");
   
};


var pullPoliticData = function(event) {

    var localZip = zipEntry.value.trim();
    console.log(localZip);
    event.preventDefault();
    
    var zipLat = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + zipCodeKey1 + "/info.json/" + localZip + "/degrees"
        fetch(zipLat).then(function(response) {
            response.json().then(function(data) {
                console.log(data)
                var localLat = data.lat 
                var localLong = data.lng
    
        var findRep = "https://v3.openstates.org/people.geo?lat=" + localLat + "&lng=" + localLong + "&apikey=" + openStatesKey    
            fetch(findRep).then(function(response) {
                return response.json().then(function(data) {
                    console.log(data)

                // List Portrait
                var imageUrl = data.results[0].image
                var avatar = document.querySelector("img")
                    avatar.src = imageUrl                 
                            
                // List Name
                var fetchName = data.results[0].current_role.title + " " + data.results[0].name + " (District " + data.results[0].current_role.district + ")"             
                repTitle.innerHTML= fetchName;
                        
                // List Contact
                $("contact-data").removeClass("hidden");
                var webSlot = document.getElementById("contact-link")
                if (data.results[0].current_role.title === "Representative") {
                    webSlot.setAttribute("href", data.results[0].openstates_url)
                    webSlot.textContent = "Contact your " + data.results[0].current_role.title
                }
                else if (data.results[0].current_role.title === "Senator") {
                    webSlot.setAttribute("href", data.results[0].openstates_url)
                    webSlot.textContent = "Contact your " + data.results[0].current_role.title 
                }
                else if (data.results[0].current_role.title === "Delegate") {
                    webSlot.setAttribute("href", data.results[0].openstates_url)
                    webSlot.textContent = "Contact your " + data.results[0].current_role.title
                }
                else {
                    webSlot.setAttribute("href", data.results[0].openstates_url)
                    webSlot.textContent = "Contact!"
                }
                    
                //List Facebook

                $("facebook-data").removeClass("hidden");
                var fetchFacebook = data.results[0].extras.facebook
                var facebookSlot = document.getElementById("facebook-link")
                if (data.results[0].extras.facebook) {
                    facebookSlot.textContent = fetchFacebook
                    facebookSlot.setAttribute("href", fetchFacebook)
                }
               
                })
            })
        })
    }) 
}

zipInput.addEventListener("submit", pullPoliticData)
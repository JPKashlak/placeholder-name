var config = {
  virtualEarthKey: "Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0",
  zipCodeKey1: "3gViGaWo0FXAWpATeUncO3LrgOb7olNRh6WyOq1qm7n1rvBkW5QEdo7ajb8GqS3o",
  openStatesKey: "72659b34-798d-4441-b6ee-c86ef9973ebb"
}


var repName =  document.getElementById('name-data');
var repTitle =  document.getElementById('role-data');
var zipInput = document.querySelector("#inputForm");
var savedZips =  document.getElementById('saved-zips');
var zipEntry = document.querySelector("#zip-field");
var errorMsg = document.getElementById('error')
var virtualEarthKey = config.virtualEarthKey;
var zipCodeKey1 = config.zipCodeKey1;
var openStatesKey = config.openStatesKey;
let currentZips
  if (localStorage.getItem('zip')) {
    currentZips = JSON.parse(localStorage.getItem('zip'))
  } else {
    currentZips = []
  }

// display data takes argument for user zip localStorage.setItem(userZip)

// get valid zip code from user
function validateForm() {
  
  var charCount = JSON.stringify(zipEntry.value).length - 2;

  if (charCount != 5 || NaN) {
    zipEntry.classList.add("is-danger");
    errorMsg.innerHTML="Zip code must be 5 digits";
  } else {
    displayData();
  }
}

function displayData() {
  var localZip = zipEntry.value.trim();

  // if zips exist, append to array
  currentZips.push(localZip)
  localStorage.setItem("zip", JSON.stringify(currentZips))
  // show the covid and politican cards
  $("div").removeClass("hidden");
  storeZips();

};

function storeZips() {
  var localZip = zipEntry.value.trim();
  newZipEl = document.createElement('a');
  newZipEl.innerHTML = "<i class='fas fa-map-marker-alt'></i> " + localZip;
  newZipEl.setAttribute('class', 'tag');
  newZipEl.setAttribute('href', 'http://google.com');
  savedZips.appendChild(newZipEl);
}

function loadZips() {
  // loop through savedTasks array
  for (var i = 0; i < currentZips.length; i++) {
    // pass each task object into the `createTaskEl()` function
    newZipEl = document.createElement('a');
    newZipEl.innerHTML = "<i class='fas fa-map-marker-alt'></i> " + currentZips[i];
    newZipEl.setAttribute('class', 'tag');
    newZipEl.setAttribute('href', 'http://google.com');
    savedZips.appendChild(newZipEl);

  }
}
   

var pullPoliticData = function(event) {

    var localZip = zipEntry.value.trim();
    event.preventDefault();
    
    var zipLat = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + zipCodeKey1 + "/info.json/" + localZip + "/degrees"
        fetch(zipLat).then(function(response) {
            response.json().then(function(data) {
                var localLat = data.lat 
                var localLong = data.lng
    
        var findRep = "https://v3.openstates.org/people.geo?lat=" + localLat + "&lng=" + localLong + "&apikey=" + openStatesKey    
            fetch(findRep).then(function(response) {
                return response.json().then(function(data) {

                // List Portrait
                var imageUrl = data.results[0].image
                var avatar = document.querySelector("img")
                    avatar.src = imageUrl                 
                            
                // List Name
                var fetchName = data.results[0].current_role.title + " " + data.results[0].name           
                repName.innerHTML= fetchName;

                // List Title
                var fetchTitle = "District " + data.results[0].current_role.district       
                repTitle.innerHTML= fetchTitle;
                        
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

                var fetchFacebook = data.results[0].extras.facebook
                var facebookSlot = document.getElementById("facebook-data")
                if (data.results[0].extras.facebook) {
                    facebookSlot.setAttribute("href", fetchFacebook)
                }
               
                })
            })
        })
    }) 
}

loadZips();
zipInput.addEventListener("submit", pullPoliticData)
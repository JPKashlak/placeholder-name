var userInput = document.getElementById("zip-field");
var errorMsg =  document.getElementById('error');
var covidCardTitle = document.getElementById("covid");
var repCardTitle =  document.getElementById('rep');
var zipInput = document.querySelector("#inputForm")
var zipEntry = document.querySelector("#zip-field")
var virtualEarthKey = config.virtualEarthKey;
var zipCodeKey1 = config.zipCodeKey1;
var openStatesKey = config.openStatesKey;


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
  fetch("http://dev.virtualearth.net/REST/v1/Locations?postalCode=" + userZip + "&key=" + virtualEarthKey).then(function(response) {
    response.json().then(function(data) {
      var countyName = data.resourceSets[0].resources[0].address.adminDistrict2;
      covidCardTitle.innerHTML= countyName + " Covid Data";
      repCardTitle.innerHTML= countyName + " Politican Info";

  // show the covid and politican cards
  $("div").removeClass("hidden");
    });
  });
}


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

                // Create Card
                       
                    // for (var i = 0; i < data.results.length; i++) {

                        // List Portrait
                        var imageUrl = data.results[0].image
                        var photoSlot = document.querySelector("#portrait")
                        var portrait = document.createElement("img")
                            portrait.src = imageUrl                 
                            photoSlot.style.width = "150px"
                            photoSlot.style.height = "200px"        
                            photoSlot.appendChild(portrait)
                            if (photoSlot.childNodes.length > 1) {
                                photoSlot.removeChild(photoSlot.childNodes[0])
                            }

                        // List Name
                        var fetchName = data.results[0].current_role.title + " " + data.results[0].name + " (District " + data.results[0].current_role.district + ")"             
                        var nameSlot = document.querySelector("#nameData")
                            nameSlot.textContent = fetchName
                        if (data.results[0].party === "Democratic") {
                            nameSlot.style.color = "#3636b3"
                        }
                        else if (data.results[0].party === "Republican") {
                            nameSlot.style.color = "#c70909"
                        }
                        else {
                            nameSlot.style.color = "#000000"
                        }
                        // List Contact
                        var webSlot = document.querySelector("#contactData")
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
                        var facebookSlot = document.querySelector("#facebookData")
                        if (data.results[0].extras.facebook) {
                            facebookSlot.textContent = fetchFacebook
                            facebookSlot.setAttribute("href", fetchFacebook)
                        }
                        else {
                            facebookSlot.textContent = "N/A"
                            facebookSlot.setAttribute("href", "")
                        }
                    // }
                })
            })
        })
    }) 
}

zipInput.addEventListener("submit", pullPoliticData)
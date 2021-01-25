var zipInput = document.querySelector("#inputForm")
var zipEntry = document.querySelector("#zipEntry")

// fetch(test)
//     .then(response => response.json())
//     .then(data => console.log(data))


// The Actual Function Starts Here. Testing Above

var pullPoliticData = function(event) {

    var localZip = zipEntry.value.trim();
    console.log(localZip);
    event.preventDefault();
    
    var zipLat = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/bPFXT7f94doreVmq3xglvcSMkik0aLNzKMiq4ggdkSV6obKC1Li3AiDT9cmwufZz/info.json/" + localZip + "/degrees"
        fetch(zipLat).then(function(response) {
            response.json().then(function(data) {
                console.log(data)
                var localLat = data.lat 
                var localLong = data.lng

            
        var testRep = "https://v3.openstates.org/people.geo?lat=" + localLat + "&lng=" + localLong + "&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"    
            fetch(testRep).then(function(response) {
                return response.json().then(function(data) {
                    console.log(data)


                    for (var i = 0; i < data.results.length; i++) {
                        
                        var fetchName = data.results[i].current_role.title + " " + data.results[i].given_name + " " + data.results[i].family_name + " (District " + data.results[i].current_role.district + "), " + data.results[i].party + " Party"
                        
                        console.log(fetchName)
                        // List Name
                        var nameSlot = document.querySelector("#nameData")
                            nameSlot.textContent = fetchName

                        // List Contact
                        var webSlot = document.querySelector("#contactData")
                        if (data.results[i].current_role.title === "Representative") {
                            webSlot.setAttribute("href", data.results[i].openstates_url)
                            webSlot.textContent = "Rep"
                        }
                        else if (data.results[i].current_role.title === "Senator") {
                            webSlot.textContent = "Sen"
                        }
                            
                        //List Facebook
                        var fetchFacebook = data.results[i].extras.facebook
                        var facebookSlot = document.querySelector("#facebookData")
                        if (data.results[i].extras.facebook) {
                            facebookSlot.textContent = fetchFacebook
                            facebookSlot.setAttribute("href", fetchFacebook)
                        }
                        else {
                            facebookSlot.textContent = "N/A"
                        }
                    }
                })
            })
        })
    }) 



    zipInput.addEventListener("submit", pullPoliticData)

    // var testZip = "http://dev.virtualearth.net/REST/v1/Locations?postalCode=" + localZip + "&key=Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0"

    // fetch(testZip).then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data)
            
    //     console.log(data.resourceSets[0].resources[0].address.adminDistrict)
    


    //     var testPolitic = "https://cors-anywhere.herokuapp.com/https://v3.openstates.org/people?jurisdiction=" + state + "&page=1&per_page=5&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"

    // fetch(testPolitic).then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data.results)
    //         for (var i = 0; i < data.results.length; i++) {
    //             if (data.results[i].current_role.title === "Senator") {
    //                 console.log("Senator " + data.results[i].name)
    //             }
    //             console.log(data.results[i].name, data.results[i].party, data.results[i].extras.facebook)
    //         }
    //     })
    // }) 

    //     })
    // })

}



// var zipInput = document.querySelector("#inputForm")
// var zipEntry = document.querySelector("#zip-field")


// var pullPoliticData = function(event) {

//     var localZip = zipEntry.value.trim();
//     console.log(localZip);
//     event.preventDefault();
    
//     var zipLat = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/3gViGaWo0FXAWpATeUncO3LrgOb7olNRh6WyOq1qm7n1rvBkW5QEdo7ajb8GqS3o/info.json/" + localZip + "/degrees"
//         fetch(zipLat).then(function(response) {
//             response.json().then(function(data) {
//                 console.log(data)
//                 var localLat = data.lat 
//                 var localLong = data.lng
    
//         var findRep = "https://v3.openstates.org/people.geo?lat=" + localLat + "&lng=" + localLong + "&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"    
//             fetch(findRep).then(function(response) {
//                 return response.json().then(function(data) {
//                     console.log(data)

//                 // Create Card
                       
//                     // for (var i = 0; i < data.results.length; i++) {

//                         // List Portrait
//                         var imageUrl = data.results[0].image
//                         var photoSlot = document.querySelector("#portrait")
//                         var portrait = document.createElement("img")
//                             portrait.src = imageUrl                 
//                             photoSlot.style.width = "150px"
//                             photoSlot.style.height = "200px"        
//                             photoSlot.appendChild(portrait)
//                             if (photoSlot.childNodes.length > 1) {
//                                 photoSlot.removeChild(photoSlot.childNodes[0])
//                             }

//                         // List Name
//                         var fetchName = data.results[0].current_role.title + " " + data.results[0].name + " (District " + data.results[0].current_role.district + ")"             
//                         var nameSlot = document.querySelector("#nameData")
//                             nameSlot.textContent = fetchName
//                         if (data.results[0].party === "Democratic") {
//                             nameSlot.style.color = "#3636b3"
//                         }
//                         else if (data.results[0].party === "Republican") {
//                             nameSlot.style.color = "#c70909"
//                         }
//                         else {
//                             nameSlot.style.color = "#000000"
//                         }
//                         // List Contact
//                         var webSlot = document.querySelector("#contactData")
//                         if (data.results[0].current_role.title === "Representative") {
//                             webSlot.setAttribute("href", data.results[0].openstates_url)
//                             webSlot.textContent = "Contact your " + data.results[0].current_role.title
//                         }
//                         else if (data.results[0].current_role.title === "Senator") {
//                             webSlot.setAttribute("href", data.results[0].openstates_url)
//                             webSlot.textContent = "Contact your " + data.results[0].current_role.title 
//                         }
//                         else if (data.results[0].current_role.title === "Delegate") {
//                             webSlot.setAttribute("href", data.results[0].openstates_url)
//                             webSlot.textContent = "Contact your " + data.results[0].current_role.title
//                         }
//                         else {
//                             webSlot.setAttribute("href", data.results[0].openstates_url)
//                             webSlot.textContent = "Contact!"
//                         }
                            
//                         //List Facebook
//                         var fetchFacebook = data.results[0].extras.facebook
//                         var facebookSlot = document.querySelector("#facebookData")
//                         if (data.results[0].extras.facebook) {
//                             facebookSlot.textContent = fetchFacebook
//                             facebookSlot.setAttribute("href", fetchFacebook)
//                         }
//                         else {
//                             facebookSlot.textContent = "N/A"
//                             facebookSlot.setAttribute("href", "")
//                         }
//                     // }
//                 })
//             })
//         })
//     }) 
// }

// zipInput.addEventListener("submit", pullPoliticData)




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



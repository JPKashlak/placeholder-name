var zipInput = document.querySelector("#inputForm")
var zipEntry = document.querySelector("#zipEntry")

console.log("Hello!")

var test = "https://cors-anywhere.herokuapp.com/https://v3.openstates.org/people.geo?lat=39.9526&lng=75.1652&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"
fetch(test).then(function(response) {
    response.json(function(data) {
        console.log(data)
    }) 
})

// var test2 = "https://cors-anywhere.herokuapp.com/https://v3.openstates.org/people.geo?lat=39.9526&lng=75.1652&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"
// fetch(test2).then(function(response) {
//         console.log(response)
// })

var pullPoliticData = function(event) {
    var repData = zipEntry.value.trim();
    console.log(repData);
    event.preventDefault();
    
    var testZip = "http://dev.virtualearth.net/REST/v1/Locations?postalCode=" + repData + "&key=Ag9vSCbKCVavmpm_CAS77TmHeRGxbmAxECOfwknIrua4eOT9rwT4ifxTOuwC9-V0"

    fetch(testZip).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            console.log(data.resourceSets[0].resources[0].address.adminDistrict2, data.resourceSets[0].resources[0].address.adminDistrict)
            
        var state = data.resourceSets[0].resources[0].address.adminDistrict
    
        var testPolitic = "https://cors-anywhere.herokuapp.com/https://v3.openstates.org/people?jurisdiction=" + state + "&page=1&per_page=5&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"

    fetch(testPolitic).then(function(response) {
        response.json().then(function(data) {
            console.log(data.results)
            for (var i = 0; i < data.results.length; i++) {
                if (data.results[i].current_role.title === "Senator") {
                    console.log("Senator " + data.results[i].name)
                }
                console.log(data.results[i].name, data.results[i].party, data.results[i].extras.facebook)
            }
        })
    }) 

        })
    })

}

zipInput.addEventListener("submit", pullPoliticData)

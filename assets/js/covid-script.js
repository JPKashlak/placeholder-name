var zipInput = document.querySelector("#inputForm")
var zipEntry = document.querySelector("#zip-entry")

var covidFunction = function(event) {

    var localZip = zipEntry.value.trim();
    console.log(localZip);
    event.preventDefault();
    
    var zipLat = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/bPFXT7f94doreVmq3xglvcSMkik0aLNzKMiq4ggdkSV6obKC1Li3AiDT9cmwufZz/info.json/" + localZip + "/degrees"
        fetch(zipLat).then(function(response) {
            response.json().then(function(data) {
                console.log(data)
                var localLat = data.lat 
                var localLong = data.lng

    var fipsFetch = "https://geo.fcc.gov/api/census/block/find?latitude=" + localLat + "&longitude=" + localLong + "&showall=true&format=json"
        fetch(fipsFetch).then(function(response) {
                    response.json().then(function(data) {
                        console.log(data.County.FIPS)

                })
            })
        })
    })
}         

zipInput.addEventListener("submit", covidFunction)
// DOM Variables
var inputForm = document.getElementById('#inputForm');
var zipEntry = document.getElementById('#zip-field');
var positiveCasesEl = document.getElementById('#positive');
var recoveredCasesEl = document.getElementById('#recovered');
var deathsCasesEl = document.getElementById('#deaths');

// Global Variables
var covidNowKey = "bb14400183684b2eba37ecb5a94ee3ec"
var countyFIPS;

/*
// Capture form input
var getCountyFips = function (event) {
    event.preventDefault();
    // Set input value to a variable
    var localZip = zipEntry.value.trim();
    console.log(localZip);
    // Set api URL to variable based on local zip to get location
    var zipLocation = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/bPFXT7f94doreVmq3xglvcSMkik0aLNzKMiq4ggdkSV6obKC1Li3AiDT9cmwufZz/info.json/" + localZip + "/degrees"
    // Initiate fetch request
    fetch(zipLocation).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            // Get data coordinates and Set to variables
            var localLat = data.lat
            var localLong = data.lng
            console.log(localLat)
            console.log(localLong)
            // Set api URL  to variable based on coodinates lat + lng to get county fips code
            var fipsFetch = "https://geo.fcc.gov/api/census/block/find?latitude=" + localLat + "&longitude=" + localLong + "&showall=true&format=json"
            // Intiate fetch request to get county fips code
            fetch(fipsFetch).then(function (response) {
                response.json().then(function (data) {
                    console.log(data.County.FIPS)
                    // get data fips code and Set to global variable
                    window.countyFIPS = data.County.FIPS
                    
                })
            })
        })
    })
}
console.log(countyFIPS)
// Event listener to call getCountyFips code
//inputForm.addEventListener("submit", getCountyFips);

*/

console.log("test")

//Function to get county data by countyFIPS from covidNow
function getCountyData() {
    // Set covidNow url to variable *****remember to channge harcoded fipscode to variable******
    var covidApiURL = "https://api.covidactnow.org/v2/county/" + "01001" + ".json?apiKey=" + covidNowKey;
    // Initiate fetch request to covidApi url
    fetch(covidApiURL).then(function (response) {
        response.json().then(function (data) {
            //check data
            console.log(response)
            // get and display positive cases
            var positiveCnt = data.actuals.cases;
            console.log(data.actuals.cases)
            positiveCasesEl.innerHTML = positiveCnt;
            
            
            /*
                // get and display death cases
                var deathCnt = data.counties.deathCt;
                deathsCasesEl.innerHTML = "Death Cases: " + deathCnt;
                // get and display recovered cases
                var recoveredCnt = positiveCnt - deathCt;
                recoveredCasesEl.innerHTML = "Recovered Cases: " + recoveredCnt;*/
        })
    });
}







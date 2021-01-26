// DOM Variables
var inputForm = document.querySelector('#inputForm');
var zipEntry = document.querySelector('#zip-field');
var currentEl = document.querySelector('#current');
var recoveredEl = document.querySelector('#recovered');
var deathsEl = document.querySelector('#deaths');

// Global Variables
var covidNowKey = "bb14400183684b2eba37ecb5a94ee3ec"
var locationApiKey = "gP9CQYmEWlWJlQqnbTplLqofQ5aDvzJzR1dpk7McZKa6DDIuLdXEsfgJR50LpVfC"

// Capture form input toget FIPScode
var getCountyData = function (event) {
    event.preventDefault();
    // Set input value to a variables
    var localZip = zipEntry.value.trim();
    console.log(localZip);

    // Set api URL to variable based on local zip to get location
    var zipLocation = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + locationApiKey + "/info.json/" + localZip + "/degrees"
    // Initiate fetch request
    fetch(zipLocation).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            // Get data coordinates and Set to variables
            var localLat = data.lat
            var localLong = data.lng
            //console.log(localLat)
            //console.log(localLong)
            // Set api URL  to variable based on coodinates lat + lng to get county fips code
            var fipsFetch = "https://geo.fcc.gov/api/census/block/find?latitude=" + localLat + "&longitude=" + localLong + "&showall=true&format=json"
            // Intiate fetch request to get county fips code
            fetch(fipsFetch).then(function (response) {
                response.json().then(function (data) {
                    //console.log(data.County.FIPS)
                    // Get data fips code and Set to global variable
                    var countyFIPS = data.County.FIPS;
                    console.log(countyFIPS)
                   
                    // Set covidNow url to variable 
                                            //*****change harcoded 01001 fipscode to var******
                    var covidApiURL = "https://api.covidactnow.org/v2/county/" + countyFIPS + ".json?apiKey=" + covidNowKey;
                    // Initiate fetch request to covidApi url
                    fetch(covidApiURL).then(function (response) {
                        response.json().then(function (data) {
                            //console.log(data)
                            // Get and display current cases
                            var currentCases = data.actuals.newCases;
                            currentEl.innerText = "Current Cases: " + currentCases;
                            console.log(data.actuals.newCases)

                            // Get total cases
                            var totalCases = data.actuals.cases;
                            //console.log(data.actuals.cases)

                            // Get and display death cases
                            var deathCnt = data.actuals.deaths;
                            //console.log(data.actuals.deaths)
                            deathsEl.innerHTML = "Death Cases: " + deathCnt;

                            // Calculate and display recovered cases
                            var recoveredCnt = totalCases - deathCnt;
                            //console.log(recoveredCnt)
                            recoveredEl.innerHTML = "Recovered Cases: " + recoveredCnt;
                        })
                    })
                })

            })
        })
    })
}

inputForm.addEventListener("submit", getCountyData);

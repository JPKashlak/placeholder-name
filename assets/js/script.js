
//DOM elements
var userInput = $("#zip-field");
var positiveCasesEl = $('#positive-Cases');
var recoveredCasesEl = $('#recovered');
var deathsCasesEl = $('#deaths');



// Function to get county data by zipcode from covid Tracker
function getCountyData() {

    //use the user input to return the county data
    userZip = JSON.stringify(userInput.value);

    var countyQuery = 'https://localcoviddata.com/covid19/v1/locations?zipCode=' + userZip;
    $.ajax({
        url: countyQuery,
        method: "GET"
    }).then(function (response) {
                // get and display positive cases
                var positiveCnt = data.counties.positiveCt;
                positiveCasesEl.innerHTML = "Positive Cases: " + positiveCnt;
                // get and display death cases
                var deathCnt = data.counties.deathCt;
                deathsCasesEl.innerHTML = "Death Cases: " + deathCnt;
                // get and display recovered cases
                var recoveredCnt = positiveCnt - deathCt;
                recoveredCasesEl.innerHTML = "Recovered Cases: " + recoveredCnt;
            
            });
}

//event listener for search button
$("#search-button").on("click", getCountyData);
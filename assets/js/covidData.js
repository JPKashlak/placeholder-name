var zipInput = document.querySelector("#inputForm");
var zipEntry = document.querySelector("#zip-field");
var positiveCasesEl = $('#positive-Cases');
var recoveredCasesEl = $('#recovered');
var deathsCasesEl = $('#deaths');

// event handler on search button
var covidData = function (event) {
    event.preventDefault();
    // set input valie to a variable
    var localZip = zipEntry.value.trim();
    console.log(localZip);
    
}
console.log("TESTING CONSOLE LOG!")
zipInput.addEventListener("submit", covidData)
//covidData();



/* Function to get county data by zipCode from covidNow
async function getCountyData() {
    // use the user input as parameter in covid api url
    var inputValue = userInput.value;

    var response = await fetch(covidApiURL + inputValue);
    var data = await response.json();
    //check data
    console.log(data)

    // get and display positive cases
    var positiveCnt = data.counties.positiveCt;
    positiveCasesEl.innerHTML = "Positive Cases: " + positiveCnt;
    // get and display death cases
    var deathCnt = data.counties.deathCt;
    deathsCasesEl.innerHTML = "Death Cases: " + deathCnt;
    // get and display recovered cases
    var recoveredCnt = positiveCnt - deathCt;
    recoveredCasesEl.innerHTML = "Recovered Cases: " + recoveredCnt;
}


// event listener for search button
$("#search-button").on("click", getCountyData);
*/
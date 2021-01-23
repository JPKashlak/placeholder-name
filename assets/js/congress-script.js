var state = "pa"

var test = "https://cors-anywhere.herokuapp.com/https://v3.openstates.org/people?jurisdiction=" + state + "&page=1&per_page=20&apikey=72659b34-798d-4441-b6ee-c86ef9973ebb"


fetch(test).then(function(response) {
    response.json().then(function(data) {
        console.log(data.results)
        for (var i = 0; i < data.results.length; i++) {
            console.log(data.results[i].name)
        }
    })
})







// 72659b34-798d-4441-b6ee-c86ef9973ebb
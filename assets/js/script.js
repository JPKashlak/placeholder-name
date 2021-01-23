var userInput = document.getElementById("zip-field");
var errorMsg =  document.getElementById('error');

// show error message if incorrect zipcode input
function validateForm() {
  var x = JSON.stringify(userInput.value).length - 2;
  
  if (x != 5 || NaN) {
    userInput.classList.add("is-danger");
    errorMsg.innerHTML="Zip code must be 5 digits";
  }
  
}
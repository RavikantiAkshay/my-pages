let jokeBtn = document.getElementById("jokeBtn");
let jokeText = document.getElementById("jokeText");
let spinner = document.getElementById("spinner");

jokeBtn.addEventListener("click", function() {
    // Show spinner and clear previous joke
    spinner.classList.remove("d-none");
    jokeText.textContent = "";
    
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/jokes/random";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            // Hide spinner and show joke
            spinner.classList.add("d-none");
            jokeText.textContent = jsonData.value;
        })
        .catch(function(error) {
            spinner.classList.add("d-none");
            jokeText.textContent = "Oops! Failed to fetch joke. Try again.";
            console.error("Error fetching joke:", error);
        });
});

let userInput = document.getElementById("userInput");
let fact = document.getElementById("fact");
let spinner = document.getElementById("spinner");

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let value = userInput.value;
        if (value === "") {
            alert("Please enter a number");
            return;
        }

        fact.textContent = "";
        spinner.classList.remove("d-none");

        let url = "https://apis.ccbp.in/numbers-fact?number=" + value;
        let options = { method: "GET" };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.add("d-none");
                fact.textContent = jsonData.fact;
            })
            .catch(function(error) {
                spinner.classList.add("d-none");
                console.error("Error fetching fact:", error);
                fact.textContent = "Oops! Something went wrong. Please try again.";
            });

        userInput.value = "";
    }
});

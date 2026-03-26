let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let countriesList = [];

function createAndAppendCountry(country) {
    let { flag, name, population } = country;

    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-11", "col-md-5", "mx-auto", "d-flex", "flex-row", "align-items-center");
    
    let countryFlag = document.createElement("img");
    countryFlag.src = flag;
    countryFlag.classList.add("country-flag");
    countryCard.appendChild(countryFlag);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("ml-4");
    
    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = name;
    infoContainer.appendChild(countryNameEl);

    let countryPopEl = document.createElement("p");
    countryPopEl.classList.add("country-population");
    countryPopEl.textContent = `Population: ${population.toLocaleString()}`;
    infoContainer.appendChild(countryPopEl);

    countryCard.appendChild(infoContainer);
    resultCountries.appendChild(countryCard);
}

function displayResults() {
    resultCountries.textContent = "";
    let searchVal = searchInput.value.toLowerCase();
    
    for (let country of countriesList) {
        if (country.name.toLowerCase().includes(searchVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    spinner.classList.remove("d-none");
    let url = "https://apis.ccbp.in/countries-data";
    let options = { method: "GET" };

    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            spinner.classList.add("d-none");
            countriesList = jsonData;
            displayResults();
        })
        .catch(error => {
            spinner.classList.add("d-none");
            console.error("Error fetching countries:", error);
        });
}

searchInput.addEventListener("input", displayResults);

getCountries();

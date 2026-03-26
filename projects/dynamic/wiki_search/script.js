let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let loading = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let { title, link, description } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResults.appendChild(resultItemEl);
}

function displayResults(searchResultsList) {
    loading.classList.add("d-none");
    for (let result of searchResultsList) {
        createAndAppendSearchResult(result);
    }
}

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let value = searchInput.value;
        if (value === "") {
            alert("Please enter a search term");
            return;
        }

        searchResults.textContent = "";
        loading.classList.remove("d-none");

        let url = "https://apis.ccbp.in/wiki-search?search=" + value;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            })
            .catch(function(error) {
                loading.classList.add("d-none");
                console.error("Error fetching results:", error);
                let errorEl = document.createElement("p");
                errorEl.textContent = "Oops! Something went wrong. Please try again.";
                errorEl.classList.add("text-danger", "text-center");
                searchResults.appendChild(errorEl);
            });
    }
});

let requestUrl = document.getElementById("requestUrl");
let requestMethod = document.getElementById("requestMethod");
let requestBody = document.getElementById("requestBody");
let responseStatus = document.getElementById("responseStatus");
let responseBody = document.getElementById("responseBody");
let consoleForm = document.getElementById("consoleForm");

function responseDisplayer(jsonData) {
    // jsonData from GoRest typically contains a 'code' and 'data' or 'meta' field
    responseStatus.value = jsonData.code || "unknown";
    responseBody.textContent = JSON.stringify(jsonData, null, 4);
}

function fetchData(fetchMethod) {
    let url = requestUrl.value;
    if (url === "") {
        alert("Enter a Request URL");
        return;
    }

    let options = {
        method: fetchMethod,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 780239a4a49e1140bf16a921072aa188cff8dec606273f8ab1436d9d772adbfa"
        }
    };

    if (fetchMethod === "POST" || fetchMethod === "PUT") {
        options.body = requestBody.value || "{}";
    }

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            responseDisplayer(jsonData);
        })
        .catch(function(error) {
            responseStatus.value = "Error";
            responseBody.textContent = error.message;
        });
}

consoleForm.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchData(requestMethod.value);
});

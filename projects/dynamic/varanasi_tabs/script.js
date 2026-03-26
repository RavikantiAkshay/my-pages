let firstButton = document.getElementById("aboutButton");
let secondButton = document.getElementById("timeToVisitButton");
let thirdButton = document.getElementById("attractionsButton");
let firstPara = document.getElementById("aboutTab");
let secondPara = document.getElementById("timeToVisitTab");
let thirdPara = document.getElementById("attractionsTab");

// Initial state
secondPara.classList.add("d-none");
thirdPara.classList.add("d-none");

function about() {
    firstButton.classList.add("selected-button");
    secondButton.classList.remove("selected-button");
    thirdButton.classList.remove("selected-button");
    firstPara.classList.remove("d-none");
    secondPara.classList.add("d-none");
    thirdPara.classList.add("d-none");
}

function timeToVisit() {
    secondButton.classList.add("selected-button");
    firstButton.classList.remove("selected-button");
    thirdButton.classList.remove("selected-button");
    secondPara.classList.remove("d-none");
    firstPara.classList.add("d-none");
    thirdPara.classList.add("d-none");
}

function attractions() {
    thirdButton.classList.add("selected-button");
    secondButton.classList.remove("selected-button");
    firstButton.classList.remove("selected-button");
    thirdPara.classList.remove("d-none");
    secondPara.classList.add("d-none");
    firstPara.classList.add("d-none");
}

//Adding Event Listener To The Search Input
let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

//Display Single Search Result 
function createAndAppendSearchResult(result) {
    let { link, title, description } = result;

    //Div Container-----Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    //anchor title-----Result Title
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    //Title Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //anchor URL--------Result URl
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //Line Break
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    //Paragraph Decription-------Line Description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}
//Define search_result Function
function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    //Displaying Multiple Search result
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}
//Getting User Entered Text
function searchWikipedia(event) {
    if (event.key === "Enter") {

        //Displaying Spinner
        spinnerEl.classList.remove("d-none");
        //Clearing Previous Search Result
        searchResultsEl.textContent = "";

        //Use URL And OPtions
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        //Read the data to JSON, Then Console the data
        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
    }
}
//Event Listener
searchInputEl.addEventListener("keydown", searchWikipedia);
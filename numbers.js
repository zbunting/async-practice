const NUMBERS_API_BASE = "http://numbersapi.com/";

function showNumberTrivia(num) {
    fetch(`${NUMBERS_API_BASE}${num}?json`) //returns a promise
        .then(resp => { // then runs on the above promise
            return resp.json(); // returns a promise
        })
        .then(numberData => { // runs on the resp.json() promise
            console.log(numberData.text); //numberData should be what we get back from API
        })
}
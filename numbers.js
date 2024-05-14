"use strict";

const NUMBERS_API_BASE = "http://numbersapi.com/";

function showNumberTrivia(num) {
    fetch(`${NUMBERS_API_BASE}${num}?json`) //returns a promise
        .then(resp => { // then runs on the above promise
            return resp.json(); // returns a promise
        })
        .then(numberData => { // runs on the resp.json() promise
            console.log(numberData.text); //numberData should be what we get back from API
        });
}


/** Given four numbers, returns piece of trivia for whichever response gets
 * returned quickest by the API. */
function showNumberRace(num1, num2, num3, num4) {
    const p1 = fetch(`${NUMBERS_API_BASE}${num1}?json`);
    const p2 = fetch(`${NUMBERS_API_BASE}${num2}?json`);
    const p3 = fetch(`${NUMBERS_API_BASE}${num3}?json`);
    const p4 = fetch(`${NUMBERS_API_BASE}${num4}?json`);

    const answerPromise = Promise.race(
        [p1, p2, p3, p4]
    );

    answerPromise
        .then(resp => resp.json())
        .then(winner => console.log(winner.text));
}

async function showNumberAll(num1, num2, num3, num4) {
    const p1 = fetch(`${NUMBERS_API_BASE}${num1}?json`);
    const p2 = fetch(`${NUMBERS_API_BASE}${num2}?json`);
    const p3 = fetch(`${NUMBERS_API_BASE}${num3}?json`);
    const p4 = fetch(`${NUMBERS_API_BASE}${num4}?json`);

    const respAll = await Promise.allSettled([p1, p2, p3, p4]);
    console.log("All Responses: ", respAll);

    const fulfilledResps = respAll
        .filter(resp => resp.status === "fulfilled" && resp.value.ok === true);
    console.log("fulfilledResps: ", fulfilledResps);

    const rejectedResps = respAll
        .filter(resp => resp.status === "rejected" || resp.value.ok === false);
    console.log("rejectedResps: ", rejectedResps);


    const dataFromNumbersAPI = await Promise
        .all(fulfilledResps.map(r => r.value.json())
        )

    for (const numData of dataFromNumbersAPI) {
        console.log(numData.text);
    }

    for (const rejectedResp of rejectedResps) {
        console.log(rejectedResp.value);
    }
}
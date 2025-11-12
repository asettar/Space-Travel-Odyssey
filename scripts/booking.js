const accomodationsUrl = "../JsonFiles/accomodations.json";
let accomodationsData = [];  // array of accomdations data

async function  getAccomodationData() {
    try{
        const res = await fetch(accomodationsUrl);
        if(!res.ok) throw new Error('Failed fetching data');
        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error : ', error);
    }
}

async function loadAccomodationData() {
    accomodationsData = await getAccomodationData();
    console.log(typeof accomodationsData);
    console.log(accomodationsData);
}

loadAccomodationData();

let userDestination = document.getElementById('user-destination');
let accomodationsContainer = document.getElementById('accomodations-container');
console.log(userDestination);
console.log(accomodationsContainer);

function    isAvailbaleDestination(accomdationData, destination) {
    const available = accomdationData["availableOn"];
    console.log(available);
    return (available.includes(destination));
}

function    addAccomadationCard(accomodationData) {
    let newAccomodationCard = document.createElement('div');
    newAccomodationCard.innerHTML = 
    `
        <div class = "form-input w-full px-4 py-3">
            <h6 class = "text-sky-500/50 text-1xl">${accomodationData["name"]}</h6>
            <p>${accomodationData["shortDescription"]}</p>
            <p>Price per Day:    ${accomodationData["pricePerDay"]} USD</p>
        </div>
    `;
    accomodationsContainer.appendChild(newAccomodationCard);
}

function    checkUserDestination() {
    console.log("destination changed");
    // update accomodations based on the picked destination
    let validAccomodations = [];  // availble for the current destination 
    const currentDestination = userDestination.value.toLowerCase();
    accomodationsContainer.innerHTML = "";
    // console.log(typeof accomodationsData);
    // console.log(accomodationsData);
    accomodationsContainer.innerHTML = "";
    for (let accomodationData of accomodationsData) {
        if (isAvailbaleDestination(accomodationData, currentDestination))
            addAccomadationCard(accomodationData);            
    }
}

// destination 
userDestination.addEventListener('change', checkUserDestination);
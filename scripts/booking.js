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

// data
const userDestination = document.getElementById('user-destination');
const accomodationsContainer = document.getElementById('accomodations-container');
const soloTraveler = document.getElementById('solo-traveler');
const coupleTraveler = document.getElementById('couple-traveler');
const groupTraveler = document.getElementById('group-traveler');
const addPassengerBtn = document.getElementById('add-passenger');
const confirmBtn = document.getElementById('confirm-btn');
const informationForm = document.querySelector('.info-form');
const infoFormContainer = document.getElementById('info-form-container');  
const totalPriceElement = document.getElementById('total-price');
let   currentSelectedAccomodation = null;   // to track the user selected accomodation 
let   currentPrice = '-';

const   destinationsPrices = {
    'Moon' : 25000,
    'Mars' : 150000,
    'Europa' : 450000,
    'Titan' : 600000,
    'Venus-clouds' : 300000,
    'Orbital-Station' : 50000
};

const   accomodationsPrices = {
    'Standard Cabin' : 500,
    'Luxury Suite' : 1200,
    'Zero-G Pod' : 2000,
    'Family Module' : 1800,
    'Research Suite' : 1500,
    'Honeymoon Suite' : 2500

};

const   travelDuration = {
    'Moon' : 3,
    'Mars' : 270,
    'Europa' : 2160,
    'Titan' : 2520,
    'Venus-clouds' : 150,
    'Orbital-Station' : 2
}

// dbg:
// console.log(userDestination);
// console.log(accomodationsContainer);
console.log(soloTraveler);
console.log(coupleTraveler);
console.log(groupTraveler);
console.log(informationForm);
console.log(infoFormContainer);

function    isAvailbaleDestination(accomdationData, destination) {
    const available = accomdationData["availableOn"];
    console.log(available);
    return (available.includes(destination));
}

// select a new accomodation and remove already selected accomodation
function    updateAccomodationselection(selectedAccomodation) {
    if (currentSelectedAccomodation)
        currentSelectedAccomodation.classList.remove('selected');
    selectedAccomodation.classList.add('selected');
    currentSelectedAccomodation = selectedAccomodation;
    updatePrice();
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
    // add event listeners. 
    newAccomodationCard.addEventListener('click', () => {
        updateAccomodationselection(newAccomodationCard);    
    })
    accomodationsContainer.appendChild(newAccomodationCard);
}

// reset selected accomodation
function    resetPriceAndAccomodation() {
    if (currentSelectedAccomodation)
        currentSelectedAccomodation.classList.remove('selected');
    currentSelectedAccomodation = null;
    currentPrice = '-';
    totalPriceElement.innerHTML = "-";
}

// update price when destination or accomodation changes
function    updatePrice() {
    const currentDestination = userDestination.value;
    if (currentSelectedAccomodation && currentDestination) {
        console.log("Update price");
        const accomodationName = currentSelectedAccomodation.querySelector('h6').innerHTML;
        currentPrice = destinationsPrices[currentDestination] 
        + accomodationsPrices[accomodationName] * 2 * travelDuration[currentDestination];
        console.log(accomodationName, accomodationsPrices[accomodationName]);
        console.log(destinationsPrices[currentDestination]);
    }
    else currentPrice = '-';
    totalPriceElement.innerHTML = `${currentPrice}`;
}

function    checkUserDestination() {
    console.log("destination changed");
    resetPriceAndAccomodation();  // remove any previous selection
    // update accomodations based on the picked destination
    let validAccomodations = [];  // availble for the current destination 
    const currentDestination = userDestination.value.toLowerCase();
    console.log(currentDestination);
    accomodationsContainer.innerHTML = "";
    // console.log(typeof accomodationsData);
    // console.log(accomodationsData);
    accomodationsContainer.innerHTML = "";
    for (let accomodationData of accomodationsData) {
        if (isAvailbaleDestination(accomodationData, currentDestination))
            addAccomadationCard(accomodationData);            
    }
    updatePrice();
}


function    addNewForm() {
    const newForm = informationForm.cloneNode(true);
    // reset form inputs and remove inline errors;
    newForm.querySelectorAll('input, textarea').forEach((e) => {
        e.value = '';
        e.style.border = '1px solid rgba(14, 165, 233, 0.3)';
    });
    
    newForm.querySelectorAll('p').forEach((e) => {
        e.remove();
    });

    infoFormContainer.appendChild(newForm);
}

// to adjust num of forms based on selected option
function    checkForms(need) {
    console.log("checked", need);
    // reset accomodation
    let currentForms = infoFormContainer.querySelectorAll('.info-form');
    currentFormsCount = currentForms.length;
    console.log(currentFormsCount);
    console.log(currentForms);
    // if need to add
    for (let i = currentFormsCount; i < need; i++)
        addNewForm();

    // if need to delete
    while (currentFormsCount > need) {
        currentForms[currentFormsCount - 1].remove();
        currentFormsCount--;
    }

    if (need === 3) {
        // add possibility to select add passenger btn
        addPassengerBtn.classList.add('btn-primary');
    }
    else  addPassengerBtn.classList.remove('btn-primary');
}

// events
userDestination.addEventListener('change', checkUserDestination);
soloTraveler.addEventListener('change', () => {checkForms(1)});
coupleTraveler.addEventListener('change', () => {checkForms(2)});
groupTraveler.addEventListener('change', () => {checkForms(3)});
addPassengerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (groupTraveler.checked) addNewForm();
    }
);

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("submit clicked");
    if (isValidForm() && confirm('are you sure you conform this booking ?'))
        window.location.href = "../index.html";
    // redirect to my bookingsPage or ticket page 
})



// price = initial price travelDuration(of destination) * pricePerday * 2
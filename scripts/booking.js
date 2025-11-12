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

const userDestination = document.getElementById('user-destination');
const accomodationsContainer = document.getElementById('accomodations-container');
const soloTraveler = document.getElementById('solo-traveler');
const coupleTraveler = document.getElementById('couple-traveler');
const groupTraveler = document.getElementById('group-traveler');
const addPassengerBtn = document.getElementById('add-passenger');
const submitBtn = document.getElementById('submit-btn');
const informationForm = document.querySelector('.info-form');
const infoFormContainer = document.getElementById('info-form-container');  

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
    console.log(currentDestination);
    accomodationsContainer.innerHTML = "";
    // console.log(typeof accomodationsData);
    // console.log(accomodationsData);
    accomodationsContainer.innerHTML = "";
    for (let accomodationData of accomodationsData) {
        if (isAvailbaleDestination(accomodationData, currentDestination))
            addAccomadationCard(accomodationData);            
    }
}


function    addNewForm() {
    const newForm = informationForm.cloneNode(true);
    infoFormContainer.appendChild(newForm);
}

// to adjust num of forms based on selected option
function    checkForms(need) {
    console.log("checked", need);

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
addPassengerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (groupTraveler.checked) addNewForm();
    }
);
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("submit clicked");
})
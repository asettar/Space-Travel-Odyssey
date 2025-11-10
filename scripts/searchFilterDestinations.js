const destinationsUrl = 'JsonFiles/destinations.json';
const destinationsContainer = document.getElementById('destinationsContainer');
console.log(destinationsContainer);
let destinationsCards = [];  // array of all destincations cards
let destinationsData = [];   // array of all destination data
let filteredData = [];  // array of data that is already filtered and can be displayed 
let MaxCards = 4;
let currentPage = 0;  // to track current page(max 4 cards per page) 

async function  data() {
    try{
        const res = await fetch(destinationsUrl);
        if(!res.ok) throw new Error('Failed fetching data');
        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error : ', error);
    }
}

function    createNewDestinationCard(destinationData) {
    console.log("Hello");
    let destinationCard = document.createElement('div'); 
    destinationCard.innerHTML = `
        <div class="flex justify-center">
                    <div class="w-64 h-64 rounded-full bg-gradient-to-r ${destinationData["color"]} flex items-center justify-center glow">
                        <i class="${destinationData["icon"]}"></i>
                    </div>
                </div>
                <div>
                    <h2 class="font-orbitron text-3xl mb-4 text-glow">${destinationData["name"]}</h2>
                    <p class="text-gray-300 mb-4 text-lg">${destinationData["description"]}</p>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Journey Time</h4>
                            <p class="text-gray-300">${destinationData["travelDuration"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Gravity</h4>
                            <p class="text-gray-300">${destinationData["Gravity"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Temperature</h4>
                            <p class="text-gray-300">${destinationData["temperature"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Atmosphere</h4>
                            <p class="text-gray-300">${destinationData["atmosphere"]}</p>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="booking.html" class="btn-primary text-white px-6 py-3 rounded-lg font-bold text-center">
                            Book ${destinationData["id"]} Journey
                        </a>
                        <a href="#" class="border border-neon-blue text-neon-blue px-6 py-3 rounded-lg font-bold text-center hover:bg-neon-blue/10 transition-colors">
                            View Gallery
                        </a>
                    </div>
                </div>
    `;
    destinationCard.classList.add("planet-card", "p-8", "mb-12", "grid", "grid-cols-1", "lg:grid-cols-2",
            "gap-8", "items-center");
    
    return destinationCard;
}


function    renderDestinationsCards() {
    let currentCardNumber = 0;
    for (let destinationData of destinationsData) {
        const destinationCard = createNewDestinationCard(destinationData);
        currentCardNumber++;
        // console.log(destinationData);
        // console.log(currentCardNumber, MaxCards);
        if (currentCardNumber > MaxCards)
            destinationCard.style.display = 'none'; // only first 4 cards displayed
        destinationsContainer.appendChild(destinationCard);
        destinationsCards.push(destinationCard);
        // destinationsData.push(destinationData);
    }
}


const loadData = async () => {
    destinationsData = await data();
    filteredData = destinationsData; // all cards are valid at first
    console.log(typeof destinationsData, destinationsData);
    renderDestinationsCards();
}

function    renderData(destinationsData) {}

loadData();

// filters :
let searchInput = document.getElementById('destinations-search-bar');
console.log("search-bar", searchInput); 

// 4-8



function    matchSearchInput(destinationData, inputValue) {
    inputValue = inputValue.toLowerCase();
    console.log(inputValue);
    console.log(destinationData, destinationData["name"]);
    if (inputValue == "") return true;
    if (destinationData["name"].toLowerCase().startsWith(inputValue))
        return true;
    if (destinationData["type"].toLowerCase().startsWith(inputValue))
        return true;
    if (destinationData["description"].toLowerCase().startsWith(inputValue))
        return true;
    return false;
}

function    validCard(destinationData) {
    // valid search
    if (!matchSearchInput(destinationData, searchInput.value)) return false;
    // valid type
    // valid price range
    // valid duration range
    // valid distance range
    return true;
}

function    filterDestinations() {
    console.log("from filter");
    
    destinationsCards.forEach((e, idx) => destinationsCards[idx].style.display = 'none');
    console.log(destinationsCards);
    // show just first 4 of the page 
    filteredData = [];
    for (let i = 0; i < destinationsCards.length; i++) {
        if (validCard(destinationsData[i], searchInput.value))
            filteredData.push(destinationsCards[i]);
    }
    currentPage = 0;
    for (let i = 0; i < Math.min(MaxCards, filteredData.length); i++)
        filteredData[i].style.display = 'grid';
}

searchInput.addEventListener('input', filterDestinations);
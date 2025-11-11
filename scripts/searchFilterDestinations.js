const destinationsUrl = 'JsonFiles/destinations.json';
const destinationsContainer = document.getElementById('destinationsContainer');
console.log(destinationsContainer);
let destinationsCards = [];  // array of all destincations cards
let destinationsData = [];   // array of all destination data
let filteredCards = [];  // array of data that is already filtered and can be displayed 
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
                            <p class="text-gray-300">${destinationData["gravity"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Temperature</h4>
                            <p class="text-gray-300">${destinationData["temperature"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Atmosphere</h4>
                            <p class="text-gray-300">${destinationData["atmosphere"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Type</h4>
                            <p class="text-gray-300">${destinationData["type"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Price</h4>
                            <p class="text-gray-300">${destinationData["price"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">Distance</h4>
                            <p class="text-gray-300">${destinationData["distance"]}</p>
                        </div>
                        <div class="bg-space-purple/50 p-4 rounded-lg">
                            <h4 class="font-orbitron text-neon-blue mb-2">travelDuration</h4>
                            <p class="text-gray-300">${destinationData["travelDuration"]}</p>
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
        filteredCards.push(destinationCard);
    }
}


const loadData = async () => {
    destinationsData = await data();
    console.log(typeof destinationsData, destinationsData);
    renderDestinationsCards();
    filterDestinations();
}

loadData();

/// Handle FIlters & Search 
let searchInput = document.getElementById('destinations-search-bar');
let typeFilter = document.getElementById('type-filter');
let minimumPrice = document.getElementById('min-price');
let maximumPrice = document.getElementById('max-price');
let minimumDistance = document.getElementById('min-dist');
let maximumDistance = document.getElementById('max-dist');

// left-right-btns 
let previousButton = document.getElementById('previous-btn');
let nextButton = document.getElementById('next-btn');



function   validSearchInput(destinationData, inputValue) {
    inputValue = inputValue.toLowerCase();
    
    if (inputValue == "") return true;
    if (destinationData["name"].toLowerCase().startsWith(inputValue))
        return true;
    if (destinationData["type"].toLowerCase().startsWith(inputValue))
        return true;
    if (destinationData["description"].toLowerCase().startsWith(inputValue))
        return true;
    return false;
}

function   validType(destinationData, typeValue) {
    return (typeValue === "") || (typeValue.toLowerCase() === destinationData["type"].toLowerCase());
}

function    validPriceRange(price, minPrice, maxPrice) {
    if (minPrice == "") minPrice = '0';
    if (maxPrice == "") maxPrice = '100000000';
    console.log("prices:")
    price = parseFloat(price);
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);
    console.log(price, minPrice, maxPrice);
    return  (price >= minPrice && price <= maxPrice);
}

function    validDistanceRange(destinationDistance, minDistance, maxDistance) {
    destinationDistance = parseFloat(destinationDistance.replace(/,/g, '').replace(/[^\d.]/g, ''));
    if (minDistance == "") minDistance = '0';
    if (maxDistance == "") maxDistance = 2e18;
    minDistance = parseFloat(minDistance);
    maxDistance = parseFloat(maxDistance);
    return (destinationDistance >= minDistance && destinationDistance <= maxDistance);
}

function    validCard(destinationData) {
    // valid search
    if (!validSearchInput(destinationData, searchInput.value)) return false;
    // valid type
    if (!validType(destinationData, typeFilter.value)) return false;

    // valid price range
    if (!validPriceRange(destinationData["price"], minimumPrice.value, maximumPrice.value)) return false;
    // valid distance range
    if (!validDistanceRange(destinationData["distance"], minimumDistance.value, maximumDistance.value))
        return false;
        // valid duration range
    return true;
}

function    filterDestinations() {
    console.log("from filter");
    
    destinationsCards.forEach((e, idx) => destinationsCards[idx].style.display = 'none');
    console.log(destinationsCards);
    // show just first 4 of the page 
    filteredCards = [];
    for (let i = 0; i < destinationsCards.length; i++) {
        if (validCard(destinationsData[i], searchInput.value))
            filteredCards.push(destinationsCards[i]);
    }
    currentPage = 0;
    for (let i = 0; i < Math.min(MaxCards, filteredCards.length); i++)
        filteredCards[i].style.display = 'grid';
}


function    getNextCards() {
    let currentCardNumber = currentPage * MaxCards;
    console.log(currentCardNumber);
    console.log(filteredCards);
    for (let i = currentCardNumber; i < Math.min(filteredCards.length, currentCardNumber + MaxCards); i++)
        filteredCards[i].style.display = 'grid';
}

// events 
searchInput.addEventListener('input', filterDestinations);
typeFilter.addEventListener('change', filterDestinations);
minimumPrice.addEventListener('input', filterDestinations);
maximumPrice.addEventListener('input', filterDestinations);
minimumDistance.addEventListener('input', filterDestinations);
maximumDistance.addEventListener('input', filterDestinations);

previousButton.addEventListener('click', () => {
    if (currentPage == 0) return ;
    currentPage--;

    // make style of current page as none and get next 4 valid cards.
    destinationsCards.forEach((e, idx) => destinationsCards[idx].style.display = 'none');
    getNextCards();    
})

nextButton.addEventListener('click', () => {
    console.log("next Buton");
    console.log(currentPage);
    // if can't get any next card return 
    if ((currentPage + 1) * MaxCards >= filteredCards.length) return ;
    currentPage++;
    console.log(currentPage);

    // make style of current page as none and get next 4 valid cards.
    destinationsCards.forEach((e, idx) => destinationsCards[idx].style.display = 'none');
    getNextCards();  
})

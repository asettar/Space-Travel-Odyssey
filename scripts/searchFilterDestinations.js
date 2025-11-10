const destinationsUrl = 'JsonFiles/destinations.json';
const destinationsContainer = document.getElementById('destinationsContainer');
console.log(destinationsContainer);

async function data() {
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
    // <div class="w-64 h-64 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center glow">
    //                     <i class="fas fa-globe-americas text-white text-6xl"></i>
    //                 </div>
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
    return destinationCard;
}


function    renderDestinationsCards(destinationsData) {
    for (let destinationData of destinationsData) {
        console.log(destinationData);
        const destinationCard = createNewDestinationCard(destinationData);
        destinationsContainer.appendChild(destinationCard);
    }
    
    console.log(destinationsContainer);
}

const loadData = async () => {
    const   destinationsData = await data();
    console.log(typeof destinationsData, destinationsData);
    renderDestinationsCards(destinationsData);
}

function    renderData(destinationsData) {
    
}

loadData();
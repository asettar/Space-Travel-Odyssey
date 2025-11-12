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
    console.log(accomodationsData);
}


loadAccomodationData();

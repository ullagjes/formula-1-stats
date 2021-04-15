
export function getRacerResults(racerId) {
    return fetch(`http://ergast.com/api/f1/2020/drivers/${racerId}/results.json`).then((response) => response.json())
}
export function getAllRacers(){
    return fetch('http://ergast.com/api/f1/2020/drivers.json?limit=30').then((response) => response.json())
}
export function getRacerDetails(racerId){
    return fetch(`http://ergast.com/api/f1/drivers/${racerId}.json`).then((response) => response.json())
}


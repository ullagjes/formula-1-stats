
//ALL RESULTS FROM RACERS 2020
export function getRacerResults(racerId) {
    try {return fetch(`http://ergast.com/api/f1/2020/drivers/${racerId}/results.json`).then((response) => response.json())
    } catch(error){
        console.log('error when fetching racer results', error)
    }
}
//ALL RACERS FROM 2020
export function getAllRacers(){
    try {return fetch('http://ergast.com/api/f1/2020/drivers.json?limit=30').then((response) => response.json())
    } catch(error){
        console.log('error when fetching all racers', error)
    }
}
//RACER DETAILS FOR ALL RACERS FROM 2020
export function getRacerDetails(racerId){
    try {return fetch(`http://ergast.com/api/f1/drivers/${racerId}.json`).then((response) => response.json())
    } catch(error){
        console.log('error when fetching racer details', error)
    }
}
//ALL RACERSTANDINGS FROM 2020
export function getRacerStandings(racerId){
    try {return fetch(`https://ergast.com/api/f1/2020/drivers/${racerId}/driverStandings.json`).then((response) => response.json())
    } catch(error){
        console.log('error when fetching racer details', error)
    }
}
//ALL CONSTRUCTORS FROM 2020
export function getAllConstructors(){
    try { return fetch('https://ergast.com/api/f1/2020/constructorStandings.json')
    .then((response) => response.json())
    } catch(error){
        console.log('error when fetching constructor data', error)
    }
}
//CONSTRUCTOR DETAILS FOR ALL CONSTRUCTORS FROM 2020
export function getConstructorDetails(constructorId){
    try { return fetch(`https://ergast.com/api/f1/2020/constructors/${constructorId}/constructorStandings.json`)
    .then((response) => response.json())
    } catch(error){
        console.log('error when fetching constructor data', error)
    }
}
//ALL CONSTRUCTOR RESULTS FROM 2020
export function getConstructorResults(constructorId){
    try { return fetch(`https://ergast.com/api/f1/2020/constructors/${constructorId}/results.json`).then((response) => response.json())

    } catch(error){
        console.log('error when fetching constructor results', error)
    }
}
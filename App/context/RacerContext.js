import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

//UTILS
import { getAllConstructors, getAllRacers } from '../utils/apiHelpers'
//CONTEXT
const RacerContext = createContext({
    racerData: null
});

const ConstructorContext = createContext({
    constructorData: null
})

//CREATES CONTEXT WITH CONSTRUCTOR DATA
export const Constructors = ({ children }) => {
    const [constructorData, setConstructorData] = useState(null)

    async function getAllConstructorData(){
        const result = await getAllConstructors()
        setConstructorData(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
    }

    useEffect(() => {
        getAllConstructorData()
    }, [])

    return(
        <ConstructorContext.Provider value={{constructorData}}>
            { children }
        </ConstructorContext.Provider>
    )
}

export const ConstructorConsumer = ConstructorContext.Consumer;

export const useConstructor = () => {
    return useContext(ConstructorContext)
};

//CREATES CONTEXT WITH RACER DATA
export const Racers = ({ children }) => {

    const [racerData, setRacerData] = useState(null);
    
    async function getAllRacerData(){
        const result = await getAllRacers()
        setRacerData(result.MRData.DriverTable)
    }

    useEffect(() => {
        getAllRacerData()
    }, [])

    return(
        <RacerContext.Provider value={{racerData}}>
            { children }
        </RacerContext.Provider>
    );
};

export const RacerConsumer = RacerContext.Consumer;

export const useRacer = () => {
    return useContext(RacerContext)
};
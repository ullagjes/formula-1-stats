import React, {
    useState,
    createContext,
    useContext,
    useEffect
} from 'react';

//UTILS
import { getAllRacers } from '../utils/apiHelpers'
//CONTEXT
const RacerContext = createContext({
    racerData: null
});

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
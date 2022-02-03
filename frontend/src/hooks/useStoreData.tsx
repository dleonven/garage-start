import { useState, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useStoreData = () => {

    const [result, setResult] = useState<any>({data: null, error: null});
    
    const storeData: any = useCallback(async (key: string, value: string) => {

        try {
            /* SAVE STAR VALUE */
            await AsyncStorage.setItem(key, value)

            /* IF SUCCESS */
            setResult((prevState: any) => ({...prevState, data: value}));
        } 
        catch(error) {
            setResult((prevState: any) => ({...prevState, error: error}));
        }


    }, [])
    
    return [result, storeData];
}


export default useStoreData
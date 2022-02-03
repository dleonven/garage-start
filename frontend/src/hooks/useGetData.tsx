import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useGetData = (key: string) => {

    const [value, setValue] = useState<string | null>(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            if(typeof key === 'undefined') throw 'Key is undefined'

            /* GET VALUE */
            const value = await AsyncStorage.getItem(key)
            if(value !== null) setValue(value)
        }
        catch(error) {
            setError(error)
        }
    }

    return { value, error }


}

export default useGetData
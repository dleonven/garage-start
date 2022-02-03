import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { toggleStar } from '../../store/actions'
import Cover from '../Cover'
import { useNavigation } from '@react-navigation/native';
import useGetData from '../../hooks/useGetData'
import useStoreData from '../../hooks/useStoreData'
import {
    Card,
    Header,
    Details,
    Line,
    Model,
    MakeYear,
    StarIcon,
} from './styles'

export interface CarProps {
    id: string
    model: string
    make: string
    year: string
    coverURL: string
}

const CardListItem: React.FC<CarProps> = (car: CarProps) => {
  

    const navigation: any = useNavigation();
    const dispatch = useDispatch()

    /* CALL THE GET DATA HOOK */
    const { value: storageStarValue } = useGetData(car.id)
    

    const star = useSelector<RootStateOrAny>((state) => {
        return state.star.starred[car.id]
    })

    const [result, storeData] = useStoreData();

    /* storageStarValue IS INITIALLY NULL, WHEN IT CHANGES, IF IT'S TRUE, MEANS STAR HAS TO BE INITIALLY PAINTED */
    useEffect(() => {
        if(storageStarValue === 'true') dispatch(toggleStar(car.id))
    }, [storageStarValue])


    /* RESULT OF STORE DATA HOOK. WHEN IT CHANGES AND ITS NOT NULL, MEANS BUTTON WAS PRESSED AND VALUE STORED SUCCESSFULLY */
    useEffect(() => {
        if(result.data) dispatch(toggleStar(car.id))
    }, [result.data])


    /* NAVIGATE TO DETAIL PASSING THE CAR AS PARAM */
    const onPressItem = () => navigation.navigate('Detail', {
        car: car
    })


    /* CALL THE storeData CALLBACK FROM useStoreData HOOK PASSING KEY, VALUE */
    const onPressStar = () => {
        storeData(car.id, (!star).toString())
    }
    
    /* MEMOIZED COMPONENT SO IT RE RENDERS ONLY ON STAR CHANGE */
    const Item = useMemo(() => {
        return(
            <TouchableOpacity onPress={onPressItem}>
                <Card>
                    <Cover source={car.coverURL} />
                    <Details>
                        <Header>
                            <Model>{car.model}</Model>
                            <TouchableOpacity onPress={onPressStar}>
                                <StarIcon star={star} />
                            </TouchableOpacity>
                        </Header>
                        <Line />
                        <MakeYear>
                            {car.make} | {car.year}
                        </MakeYear>
                    </Details>
                </Card>
            </TouchableOpacity>
        )
    }, [star])


    return Item
}


export default CardListItem

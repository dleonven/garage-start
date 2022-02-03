import React, { useEffect } from 'react'
import {
    Card,
    Header,
    Details,
    Line,
    Model,
    MakeYear,
    StarIcon,
} from '../../../components/CardListItem/styles'
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { toggleStar } from '../../../store/actions'
import useStoreData from '../../../hooks/useStoreData'
import { useScreenDimensions } from '../../../hooks/useScreenDimensions'


export default function Detail(props: {route: any}) {
    const dispatch = useDispatch()
    const size = useScreenDimensions()

    /* GET DATA FROM NAVIGATION PARAMS */
    const { car } = props.route.params;
        
    const star = useSelector<RootStateOrAny>((state) => {
        return state.star.starred[car.id]
    })

    const [result, storeData] = useStoreData();

    /* RESULT.DATA IS INITIALLY NULL. WHEN IT CHANGES AND IT'S NOT NULL, MEANS THE STAR WAS PRESSED AND VALUE STORED SUCCESSFULY */
    useEffect(() => {
        if(result.data) dispatch(toggleStar(car.id))
    }, [result.data])

    /* CALL THE storeData CALLBACK FROM useStoreData HOOK PASSING KEY, VALUE */
    const onPressStar = () => storeData(car.id, (!star).toString())

    return(
        <View style={styles.container}>
            <Card>
                <Image
                    source={{ uri: car.coverURL }}
                    style={{
                        width: '100%',
                        height: size.width * 0.67,
                    }}
                />
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
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16
    }
})


import React, { useState, memo, useMemo } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import CardListItem from '../../components/CardListItem'
import { Space } from './styles'

import * as data from '../../cars.json';

const Garage = () => {
    

    const { items } = data

    /* FOR FUTURE PAGINATION (ASSUMING AN ENDPOINT THAT RETURNS NEXT BATCH OF ITEMS) */
    const [page, setPage] = useState<number>(1)


    const renderItem = (item: any) => {

        const carItem = item.item

        return(
            <>
                <Space />
                    <CardListItem
                        id={carItem.id}
                        model={carItem.model}
                        make={carItem.make}
                        year={carItem.year}
                        coverURL={carItem?.image?.url}
                    />
            </>
        )
    }
    
    /* FOR FUTURE PAGINATION (ASSUMING AN ENDPOINT THAT RETURNS NEXT BATCH OF ITEMS) */
    const fetchMore = () => {
        /* FETCH(PAGE) */

        /* setData(prevState concat new items) */

        setPage(page + 1)

    }

    /* MEMOIZED COMPONENT SO IT RE RENDERS ONLY ON ITEMS CHANGE */
    const List = useMemo(() => {
        return(
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item: any, index: any) => index}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                initialNumToRender={2}
                /* FOR FUTURE PAGINATION */
                //onEndReached={fetchMore}
            />
        )

    }, [items])

    return(
        <SafeAreaView>
            {List}
        </SafeAreaView>
    )

}

export default Garage


import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Garage from '../screens/Garage'
import Detail from '../screens/Garage/Detail'
import { Title } from '../screens/Garage/styles'

const GarageStack = createNativeStackNavigator();


export default function GarageStackNavigator() {
    return(
        <GarageStack.Navigator>
            <GarageStack.Screen 
                name="Garage" 
                component={Garage}
            />
            <GarageStack.Screen 
                name="Detail" 
                component={Detail} 
            />
        </GarageStack.Navigator>
    )
}
import React from 'react'
import { Container, StatusBar } from './src/styles'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GarageStack from './src/navigation/GarageStack'



export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <GarageStack />
            </NavigationContainer>
        </Provider>
    )
}

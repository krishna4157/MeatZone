import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import IntroPage from './IntroPage';
import OtpPage from './OtpPage';
import SelectLocationPage from './SelectLocationPage';


const Stack = createNativeStackNavigator();

export default function Container() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="OTPPage" component={OtpPage} />
                <Stack.Screen name="IntroPage" component={IntroPage} />
                <Stack.Screen name="LocationPage" component={SelectLocationPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import IntroPage from './IntroPage';
import OtpPage from './OtpPage';
import SelectLocationPage from './SelectLocationPage';
import HomePage from './HomePage';
import AppDrawer from './AppDrawer';
import EditProfilePage from './EditProfilePage';
import VendorDrawer from './VendorDrawer';
import ChooseTypePage from './ChooseTypePage';
import RenderInitialPage from './renderInitialPage';
export const navigationRef = React.createRef();


const Stack = createNativeStackNavigator();

export default function Container() {
    return (
        <NavigationContainer  ref={navigationRef}  >
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >
                <Stack.Screen  name="RenderInitialPage" component={RenderInitialPage} />
                <Stack.Screen  name="ChooseTypePage" component={ChooseTypePage} />
                <Stack.Screen  name="LoginPage" component={LoginPage} />
                <Stack.Screen  name="OTPPage" component={OtpPage} />
                <Stack.Screen  name="IntroPage" component={IntroPage} />
                <Stack.Screen  name="LocationPage" component={SelectLocationPage} />
                <Stack.Screen  name="HomePage" component={HomePage} />
                <Stack.Screen  name="AppDrawer" component={AppDrawer} />
                <Stack.Screen  name="VendorAppDrawer" component={VendorDrawer} />
                <Stack.Screen  name="EditProfilePage" component={EditProfilePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
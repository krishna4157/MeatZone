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
import MainPage from './MainPage';
import ProductOnFocusPage from './ProductOnFocusPage';
import ProductBasedPage from './ProductBasedPage';
export const navigationRef = React.createRef();


const Stack = createNativeStackNavigator();

export default function SearchPage({route, navigation}) {
    	// alert(JSON.stringify(route));
        
    return (
            <Stack.Navigator initialRouteName="ProductOnHomePage" screenOptions={{
                headerShown: false,
            }} >
                <Stack.Screen initialParams={{...route.params}} name="ProductOnHomePage" component={MainPage} />
                <Stack.Screen initialParams={{...route.params}} name="ProductOnFocusPage" component={ProductOnFocusPage} />
                <Stack.Screen initialParams={{...route.params}} name="ProductBasedPage" component={ProductBasedPage} />
            </Stack.Navigator>
    );
}
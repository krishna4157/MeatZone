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
import VendorShopPage from './VendorShopPage';
import VendorDetailsPage from './VendorDetailsPage';
import VendorEditShopPage from './VendorEditShopPage';
import VendorShopBankDetailsPage from './VendorShopBankDetailsPage';
export const navigationRef = React.createRef();


const Stack = createNativeStackNavigator();

export default function VendorShopStack() {
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >    
            <Stack.Screen  options={{headerShown:true,title:'My Shop',headerTitleAlign:'center'}} name="VendorShopPage" component={VendorShopPage} />
            <Stack.Screen  options={{headerShown:true,title:'My Details1',headerTitleAlign:'center'}} name="VendorDetailsPage" component={VendorDetailsPage} />
            <Stack.Screen  options={{headerShown:true,title:'My Details1',headerTitleAlign:'center'}} name="VendorEditShopPage" component={VendorEditShopPage} />
            <Stack.Screen  options={{headerShown:true,title:'My Details1',headerTitleAlign:'center'}} name="VendorShopBankDetailsPage" component={VendorShopBankDetailsPage} />
            </Stack.Navigator>
    );
}
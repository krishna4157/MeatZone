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
import VendorCategoryPage from './VendorCategoryPage';
import VendorCategoryCreatePage from './VendorCategoryCreatePage';
import VendorProductCreatePage from './VendorProductCreatePage';
import VendorProductPage from './VendorProductPage';
import VendorOrderPage from './VendorOrderPage';
import VendorOrderDetailsPage from './VendorOrderDetailsPage';
export const navigationRef = React.createRef();


const Stack = createNativeStackNavigator();

export default function VendorOrderStack() {
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >    
            <Stack.Screen  options={{headerShown:true,title:'My Product',headerTitleAlign:'center'}} name="VendorOrderPage" component={VendorOrderPage} />
            <Stack.Screen  options={{headerShown:true,title:'Create Product',headerTitleAlign:'center'}} name="VendorOrderDetailsPage" component={VendorOrderDetailsPage} />
            </Stack.Navigator>
    );
}
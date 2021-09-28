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
import VendorSubCategoryPage from './VendorSubCategoryPage';
import VendorSubCategoryCreatePage from './VendorSubCategoryCreatePage';
export const navigationRef = React.createRef();


const Stack = createNativeStackNavigator();

export default function VendorSubCategoryStack() {
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >    
            <Stack.Screen  options={{headerShown:true,title:'My Sub Categories',headerTitleAlign:'center'}} name="VendorSubCategoryPage" component={VendorSubCategoryPage} />
            <Stack.Screen  options={{headerShown:true,title:'Create Sub Categories',headerTitleAlign:'center'}} name="VendorSubCategoryCreatePage" component={VendorSubCategoryCreatePage} />
            </Stack.Navigator>
    );
}
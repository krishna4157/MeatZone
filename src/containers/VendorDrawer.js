import * as React from 'react';
import { View, Text } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSideBarMenu';
import { withNavigation } from 'react-navigation';
import HomePage from './HomePage';
import EditProfilePage from './EditProfilePage';
import FAQPage from './FAQPage';
import VendorSideBarMenu from './VendorSideBarMenu';
import VendorDashBoardPage from './VendorDashBoardPage';
import VendorShopPage from './VendorShopPage';
import VendorDetailsPage from './VendorDetailsPage';
import VendorShopStack from './VendorShopStack';
import VendorCategoryScreen from '../components/VendorCategoryScreen';
import VendorCategoryPage from './VendorCategoryPage';
import VendorCategoryStack from './VendorCategoryStack';
import VendorProductStack from './VendorProductStack';
import VendorOrderPage from './VendorOrderPage';
import VendorOrderStack from './VendorOrderStack';
import VendorSubCategoryPage from './VendorSubCategoryPage';
import VendorSubCategoryCreatePage from './VendorSubCategoryCreatePage';
import VendorSubCategoryStack from './VendorSubCategoryStack';
// import InitialVendorPage from './initialVendorPage';
// export function openAppDrawer() {

// }

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article({navigation}) {
    navigation.openDrawer();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer({route, navigation}) {
    return (
    <Drawer.Navigator screenOptions={{gestureEnabled:false}} defaultStatus="closed" drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}

      drawerContent={(props) => <VendorSideBarMenu {...props} />}>
      <Drawer.Screen  options={{headerShown:true,title:'Home',headerTitleAlign:'center'}} name="VendorDashBoardPage" initialParams={{...route.params}} component={VendorDashBoardPage} />
      <Drawer.Screen  options={{headerShown:true,title:'Home',headerTitleAlign:'center'}} name="VendorProfilePage" component={EditProfilePage} />
      <Drawer.Screen  options={{headerShown:false,title:'My Shop',headerTitleAlign:'center'}} name="VendorShopStack" component={VendorShopStack} />
      <Drawer.Screen  options={{headerShown:true,title:'My Details',headerTitleAlign:'center'}} name="VendorDetailsPage" component={VendorDetailsPage} />
      <Drawer.Screen  options={{headerShown:false,title:'My Details',headerTitleAlign:'center'}} name="VendorCategoryStack" component={VendorCategoryStack} />
      <Drawer.Screen  options={{headerShown:false,title:'My Products',headerTitleAlign:'center'}} name="VendorProductStack" component={VendorProductStack} />
      <Drawer.Screen  options={{headerShown:false,title:'My Orders',headerTitleAlign:'center'}} name="VendorOrderStack" component={VendorOrderStack} />
      
      <Drawer.Screen  options={{headerShown:false,title:'My Orders',headerTitleAlign:'center'}} name="VendorSubCategoryStack" component={VendorSubCategoryStack} />

      {/* <Drawer.Screen  options={{headerShown:false}} name="VendorFAQPage" component={FAQPage} /> */}
      
    </Drawer.Navigator>
  );
}

function VendorDrawer({ route, navigation}) {
  
    return (
      
      <MyDrawer route={route} navigation={navigation} />
  );
}
export default withNavigation(VendorDrawer)
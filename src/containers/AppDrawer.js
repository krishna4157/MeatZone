import * as React from 'react';
import { View, Text } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSideBarMenu';
import { withNavigation } from 'react-navigation';
import HomePage from './HomePage';
import EditProfilePage from './EditProfilePage';
import FAQPage from './FAQPage';
import OrdersPage from './OrdersPage';
import FavPage from './FavPage';
import PaymentPage  from './PaymentPage';
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

function MyDrawer ({route, navigation}) {
    return (
    <Drawer.Navigator screenOptions={{gestureEnabled:false}} defaultStatus="closed" drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}

      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen  options={{headerShown:false}} name="ArticlePage" initialParams={{...route.params}} component={HomePage} />
      <Drawer.Screen  options={{headerShown:false}} name="EditProfilePage" component={EditProfilePage} />
      <Drawer.Screen  options={{headerShown:false}} name="FAQPage" component={FAQPage} />
      <Drawer.Screen  options={{headerShown:false}} name="OrdersPage" component={OrdersPage} />
      <Drawer.Screen  options={{headerShown:true,title:'My Favorites'}} name="FavPage" component={FavPage} />
      <Drawer.Screen  options={{headerShown:true,title:'Payment Gateway'}} name="PaymentPage" component={PaymentPage} />

      
    </Drawer.Navigator>
  );
}

function AppDrawer({ route, navigation}) {
  
    return (
      
      <MyDrawer route={route} navigation={navigation} />
  );
}
export default withNavigation(AppDrawer)
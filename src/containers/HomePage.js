import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OtpPage from './OtpPage';
import SelectLocationPage from './SelectLocationPage';
import { Ionicons,Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchPage from './SearchPage';
import CartPage from './CartPage';
import AppDrawer from './AppDrawer';
import { DrawerActions } from 'react-navigation-drawer'
import { navigationRef } from './NavigationScreens';
import ShopScreen from '../components/ShopScreen';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigationFocus } from 'react-navigation';
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "../actions/counter";

const Tab = createBottomTabNavigator();

function HomePage({ route, navigation}) {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();


  return (
    <Tab.Navigator  >
      <Tab.Screen initialParams={{...route.params}} options={{
      tabBarShowLabel: false,
      
      header: (props) => {
        return (
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'white'}}>
        <Image style={{width:50,height:50,alignSelf:'center',justifyContent:'center',borderRadius:50}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
          <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold'}}>MeatZone</Text>
            <TouchableOpacity onPress={()=> {
              // dispatch(increment());
              props.navigation.navigate('cart');
              }}>
            {counter > 0 && <View style={{backgroundColor:'red',position:'absolute',borderRadius:15,top:5}}>
              <Text style={{padding:2,paddingLeft:7,paddingRight:7,color:'white'}}>{JSON.stringify(counter)}
                </Text>
              </View>}
            <MaterialCommunityIcons name="cart-outline" size={25} style={{padding:15}}/>
            </TouchableOpacity>
          </View>);
      },
      
      // header: () =>{
      //   return (<View style={{flexDirection:'row'}} >
      //     {/* <Image style={{width:50,height:50,alignSelf:'center',justifyContent:'center'}} source={require('../assets/AppIcons/web_hi_res_512.png')} /> */}
      //     </View>)
      // },
      tabBarIcon: ({ focused, color, size }) => {
        return ( 
        <Ionicons name="home" color={focused ? 'red' : 'black'} size={25} />
      );
        }
    }} name="Home" component={SearchPage} />
      <Tab.Screen 
      initialParams={{...route.params}}
      options={{
      tabBarShowLabel: false,
      headerShown: false,
        tabBarIcon:  ({ focused, color, size }) => {
          return ( 
          <Feather name="search" color={focused ? 'red' : 'black'} size={25} />);
        }
    }} name="Settings" component={ShopScreen} />
    <Tab.Screen 
    initialParams={{...route.params}}
    options={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        return ( 
        <FontAwesome5 name="clipboard-list"  color={focused ? 'red' : 'black'}  size={25} />
      );
      }
    }} name="cart" component={CartPage} />
    <Tab.Screen
    initialParams={{...route.params}}
    listeners={({navigation})=> ({
      tabPress: event => {
       navigation.openDrawer();
        event
        .preventDefault();
      }
    })}
    options={{
      tabBarShowLabel: false,
      headerShown: false,
      
      tabBarIcon: ({ focused, color, size }) => {
        return ( 
        <FontAwesome name="user" color={focused ? 'red' : 'black'} size={25} />);
      },
    }} name="AppDrawer" component={AppDrawer} />
    
    </Tab.Navigator>
  );
}

export default HomePage;
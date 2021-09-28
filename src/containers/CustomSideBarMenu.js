// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Input, Item, Button, Icon, Card, CardItem, Body } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutFromApp = async () => {
  await AsyncStorage.setItem('userData',"");
  await AsyncStorage.setItem('type',"");
  const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/logout`, {
      headers: { 
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${retrieveAccessTocken}`,
        },
  });
  await AsyncStorage.setItem('userData',"");
  await AsyncStorage.setItem('type',"");
}

class CustomSidebarMenu extends React.Component  {
  
  state = {
    name : '',
    email : ''
  }
  
  componentDidMount= async() => {
    const  { navigation } = this.props;
    const data = await AsyncStorage.getItem("userDetails");
    const parsedData = JSON.parse(data);
    this.setState({
      name :  parsedData.user.name,
      email : parsedData.user.email
    })
  navigation.addListener('focus', () => {
      // Do whatever you want
  const parsedData = JSON.parse(data);
    this.setState({
      name :  parsedData.user.name,
      email : parsedData.user.email
    })
    });
 
  }
  
  
  render() {
    const { name, email} = this.state;
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
              <View style={{backgroundColor:'red'}}>
              <Text style={{textAlign:'center',alignSelf:'center',fontSize:20,backgroundColor:'red',marginTop:30,color:'white',fontWeight:'bold'}}>Profile</Text>
              </View>
      {/*Top Large Image */}
      <View style={{flexDirection:'row',backgroundColor:'red',paddingBottom:40}}>
      <View style={{flexDirection:'row',marginTop:30,justifyContent:'flex-start',marginLeft:10}}>
      <Image
        source={require('../assets/images/ProfilePic.png')}
        style={styles.sideMenuProfileIcon}
      />
      <View style={{flexDirection:'column',justifyContent:'center',marginLeft:15}}>
          <Text style={{fontWeight:'bold',color:'white'}}>{name}</Text>
          <Text style={{color:'white'}}>developer</Text>
          </View>
      </View>
      </View>
      <DrawerContentScrollView {...this.props}>
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        /> */}
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('EditProfilePage');
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>
        
        <FontAwesome name="user" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            Personal Information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('FavPage');
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>
        <View style={{flexDirection:'row',backgroundColor:'white'}}>
        
        <MaterialIcons name="favorite" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            My Fav
          </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('OrdersPage');
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>
        <View style={{flexDirection:'row',backgroundColor:'white'}}>
        
        <MaterialIcons name="payments" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            My Orders
          </Text>
        </View>
        </TouchableOpacity>
        {/* <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <MaterialIcons name="payment" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Payment method
          </Text>
        </View> */}
        {/* <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <MaterialCommunityIcons name="brightness-percent" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Promotional code
          </Text>
        </View> */}
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('FAQPage');
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>
        <MaterialCommunityIcons name="chat-alert-outline" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            FAQ
          </Text>
        </TouchableOpacity>
        {/* <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <Ionicons name="ios-settings" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Settings
          </Text>
        </View> */}
        <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <Entypo name="info-with-circle" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            About
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{
          logoutFromApp();
          
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'RenderInitialPage' }]
       })
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>

        <Entypo name="log-out" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            Logout
          </Text>
          </TouchableOpacity>
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey',
          backgroundColor:'white'
        }}>
        
      </Text>
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    backgroundColor:'transparent'
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
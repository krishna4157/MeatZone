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
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Input, Item, Button, Icon, Card, CardItem, Body } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collapsible from 'react-native-collapsible';

const logoutFromApp = async () => {
  const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
  const res = await api.get(`/logout`, {
      headers: { 
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${retrieveAccessTocken}`,
        },
  });
  alert(JSON.stringify(res.data));
}

class VendorSideBarMenu extends React.Component {

    state = {
        isDashBoardCollapsed: true,
        isProductsCollapsed: true,
        isCategoriesCollapsed: true,

    }

    triggerCollapsedDashBoard = () => {
        const  { isDashBoardCollapsed } = this.state;
        // alert(isCollapsed);
        this.setState({
            isDashBoardCollapsed : !isDashBoardCollapsed
        })
    }
    
    triggerCollapsedProducts = () => {
        const  { isProductsCollapsed } = this.state;
        // alert(isCollapsed);
        this.setState({
            isProductsCollapsed : !isProductsCollapsed
        })
    }

    triggerCollapsedCategories = () => {
        const  { isCategoriesCollapsed } = this.state;
        // alert(isCollapsed);
        this.setState({
            isCategoriesCollapsed : !isCategoriesCollapsed
        })
    }

    render() {
        const { isDashBoardCollapsed, isCategoriesCollapsed, isProductsCollapsed } = this.state;
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
    // var isCollapsed = false;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View style={{flexDirection:'column',backgroundColor:'white',paddingBottom:40,justifyContent:'center',alignItems:'center',borderBottomWidth:3,borderColor:'red'}}>
      <View style={{flexDirection:'column',marginTop:30,justifyContent:'center'}}>
      <Image
        source={require('../assets/images/ProfilePic.png')}
        style={styles.sideMenuProfileIcon}
      />
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontWeight:'bold',color:'white'}}>G Krishna Santosh</Text>
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
        
        <View onPress={()=>{
          // alert(JSON.stringify(props));
        //   props.navigation.navigate('EditProfilePage');
        }} style={{flexDirection:'column',padding:20,backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=> this.triggerCollapsedDashBoard()} style={{flexDirection:'row'}}>
        <MaterialCommunityIcons name="view-dashboard" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={isDashBoardCollapsed}>
        <View style={{marginLeft: 20,flexDirection:'row',marginTop:15}}>
        <MaterialCommunityIcons name="view-dashboard" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            All Dashboard
          </Text>
        </View>
        </Collapsible>
        </View>
        <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <Entypo name="shop" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              this.props.navigation.navigate('VendorShopStack');
            }}>
            My Shop
          </Text>
        </View>
        <View onPress={()=>{
          // alert(JSON.stringify(props));
        //   props.navigation.navigate('EditProfilePage');
        }} style={{flexDirection:'column',padding:20,backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=> this.triggerCollapsedCategories()} style={{flexDirection:'row'}}>
        <MaterialIcons name="category" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}>
            Categories
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCategoriesCollapsed}>
        <View style={{marginLeft: 20,flexDirection:'row',marginTop:15}}>
        <MaterialIcons name="category" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={()=> this.props.navigation.navigate('VendorCategoryStack')}
            >
            All Categories
          </Text>
        </View>
        </Collapsible>

        </View>
        <View onPress={()=>{
          // alert(JSON.stringify(props));
        //   props.navigation.navigate('EditProfilePage');
        }} style={{flexDirection:'column',padding:20,backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=> this.triggerCollapsedProducts()} style={{flexDirection:'row'}}>
        <FontAwesome5 name="box-open" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}>
            Products
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={isProductsCollapsed}>
        <View style={{marginLeft: 20,flexDirection:'row',marginTop:15}}>
        <FontAwesome5 name="box-open" size={30} />
          <Text onPress={()=> this.props.navigation.navigate("VendorProductStack")} style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            All Products
          </Text>
        </View>
        </Collapsible>

        </View>
        <View onPress={()=>{
          // alert(JSON.stringify(props));
        //   props.navigation.navigate('EditProfilePage');
        }} style={{flexDirection:'column',padding:20,backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=> this.triggerCollapsedProducts()} style={{flexDirection:'row'}}>
        <MaterialIcons name="payments" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}>
            Order Management
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={isProductsCollapsed}>
        <View style={{marginLeft: 20,flexDirection:'row',marginTop:15}}>
        <MaterialIcons name="payment" size={30} />
          <Text onPress={()=> this.props.navigation.navigate('VendorOrderStack')} style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            All Orders
          </Text>
        </View>
        </Collapsible>

        </View>
        <View style={{flexDirection:'row',padding:15,backgroundColor:'white'}}>
        <Entypo name="wallet" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Wallets
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{
          // alert(JSON.stringify(props));
          // this.props.navigation.navigate('FAQPage');
        }} style={{flexDirection:'row',padding:20,backgroundColor:'white'}}>
        <Entypo name="chat" size={30} />
          <Text style={{textAlign:'center',alignSelf:'center',marginLeft:15}}
            >
            Quotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          // alert(JSON.stringify(props));
          logoutFromApp();
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }]
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
    }
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    alignSelf:'center',
    backgroundColor:'transparent',
    marginBottom:20
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

export default VendorSideBarMenu;
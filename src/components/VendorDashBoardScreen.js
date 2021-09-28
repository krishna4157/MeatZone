import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/vendorApi';
import AsyncStorage from '@react-native-async-storage/async-storage';



class VendorDashBoardScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false,
      fullName : '',
      email : '',
      phoneNumber : '',
      totalOrder:'',
      totalItems:'',
      totalSubCat: '',
      loading : false
    }
  }

  componentDidMount = async () => {
    const { navigation} = this.props;
   const data = await AsyncStorage.getItem('userData');
   this.renderDashBoardData();

    const res = JSON.parse(data);
    this.setState({
      fullName : res.name,
      email : res.email,
      phoneNumber : res.phone
    });
    navigation.addListener('focus', () => {
      // Do whatever you want
      this.renderDashBoardData();
                });
    
  }

  renderDashBoardData = async() => {
    this.setState({
      loading: true
    });
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    const res = await api.get(`/myProfile`,{
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });
    this.setState({
      totalOrder :res.data.totalOrder,
      totalItems : res.data.totalItems,
      totalSubCat : res.data.totalSubCat
    });
    this.setState({
      loading: false
    });
    // alert(JSON.stringify(res.data.user));

  }


  getCorrectPassword = async () => {
    const { navigation } = this.props;
    // this.setState({
    //   statusColor: 'blue'
    // });
    // navigation.navigate("KycScreen");

  }


  getWrongPassword = (e) => {
    this.setState({
      statusColor: 'blue'
    });
    this.setState({
      isSuccess: 0
    });
    // this.StartBackgroundColorAnimation()

    setTimeout(() => {

      this.setState({
        isSuccess: 2
      })
    }, 10000);



  }







  checkValues = async (values) => {
    try {
      const data = {
        "name": values.fullName,
        "email": values.email,
        "phone":values.phoneNumber,
        "location":"Airport Ring Road, Odhav Vandana II, Bhuj, Gujarat",
        "latitude":"23.271342200671988 ",
        "longitude":"69.66265632536503"
    }
    const res = await api.post('/editProfile',data);

    } catch (e) {
      console.log(e);
      this.getWrongPassword(e);
    }
  }

  triggerModal = () => {
    this.setState({
      modalVisible : true
    });
  }

  changeCallCodeAndFlag = (cca2,cc) => {
    this.setState({
      callingCode : '+'+cc,
      cca2 : cca2
    });
  }


  render() {
    const { navigation } = this.props;
    const { totalItems, totalOrder, totalSubCat, loading } = this.state;
    return (
        <View style={{flex:1,backgroundColor:'white',flexDirection:'column'}} >
          {loading && <View style={{ position: 'absolute', zIndex: 1, height: '100%', width: '100%', justifyContent: 'center' }}>

<ActivityIndicator size="large" color="red" />
</View>}
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:10,padding:10}} >
                <TouchableOpacity style={{height:130,width:180,backgroundColor:'#319EB5',justifyContent:'center',borderRadius:10,padding:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>{totalItems}</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:180,backgroundColor:'#3AA639',height:130,justifyContent:'center',borderRadius:10,padding:10,marginLeft:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>{totalOrder}</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total order</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:-5,padding:10}} >
                <TouchableOpacity style={{height:130,width:180,backgroundColor:'#FEAE39',justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>{totalSubCat}</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>total Sub Categories</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{width:180,backgroundColor:'#ffe9c9',height:130,justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Products List</Text>
                </TouchableOpacity> */}
            </View>
            {/* <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}} >
            <TouchableOpacity style={{height:130,width:180,backgroundColor:'#ffe9c9',justifyContent:'center',borderRadius:10}}>
            <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Inactive Products</Text>
                </TouchableOpacity>
                <View style={{height:130,width:180,justifyContent:'center',borderRadius:10}} />
            </View> */}
            </View>
    );

  }
}


export default VendorDashBoardScreen;

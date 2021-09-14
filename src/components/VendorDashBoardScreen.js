import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/api';
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
      phoneNumber : ''
    }
  }

  componentDidMount = async () => {
   const data = await AsyncStorage.getItem('userData');
    const res = JSON.parse(data);
    this.setState({
      fullName : res.name,
      email : res.email,
      phoneNumber : res.phone
    });
  }


  getCorrectPassword = async () => {
    const { navigation } = this.props;
    // this.setState({
    //   statusColor: 'blue'
    // });
    // alert('hello');
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




  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }



  checkValues = async (values) => {
    alert(JSON.stringify(values));
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
    alert(JSON.stringify(res.data));

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
    const { modalVisible, callingCode, cca2,fullName,email,phoneNumber } = this.state;
    return (
        <View style={{flex:1,backgroundColor:'white',flexDirection:'column'}} >
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}} >
                <TouchableOpacity style={{height:130,width:180,backgroundColor:'red',justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:180,backgroundColor:'red',height:130,justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Active Products</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}} >
                <TouchableOpacity style={{height:130,width:180,backgroundColor:'red',justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Inactive Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:180,backgroundColor:'red',height:130,justifyContent:'center',borderRadius:10}}>
                <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Products List</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}} >
            <TouchableOpacity style={{height:130,width:180,backgroundColor:'red',justifyContent:'center',borderRadius:10}}>
            <Text style={{textAlign:'center',alignSelf:'center',fontSize:25}}>0</Text>
                    <Text style={{textAlign:'center',alignSelf:'center'}}>Total Inactive Products</Text>
                </TouchableOpacity>
                <View style={{height:130,width:180,justifyContent:'center',borderRadius:10}} />
                
            </View>
            </View>
    );

  }
}


export default VendorDashBoardScreen;

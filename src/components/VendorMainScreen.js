import { Formik } from 'formik';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Image } from 'react-native';
// import Flag from 'react-native-flags';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



class VendorMainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false,
      loading: false
    }
  }

  componentDidMount = async () => {
    const { route } = this.props;
    // alert(JSON.stringify(route));
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
    const { navigation} = this.props;
    try {
      const user = {
        phone: values.phoneNum,
      };
      // alert(values.phoneNum);
      // this.getCorrectPassword();
      this.setState({
        loading: true
      });
      const res = await api.post('/sendOtp',{ phone : values.phoneNum}).then((d)=> {
        // alert(JSON.stringify(d));
        return d;
      });
      
      // alert(JSON.stringify(res));
      const userData = JSON.stringify(res.data.user);
      // alert(JSON.stringify(userData));
      
      await AsyncStorage.setItem('userData', userData).then((data)=> {
        this.setState({
          loading: false
        });
        
        navigation.navigate('OTPPage');
      });
      // navigation.navigate('OTPPage');
      
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
    const { modalVisible, callingCode, cca2, loading } = this.state;
    return (
      <View style={{flex:1}}>
      {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
               <ActivityIndicator size="large" color="red" />
              </View>}
      <View style={{flex:1,backgroundColor:'red'}}>
          </View>
      </View>
    );

  }
}


export default VendorMainScreen;

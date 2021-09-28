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
import api from '../utils/vendorApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



class ChooseTypeScreen extends React.Component {

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
    const { navigation} = this.props;
    try {
      const user = {
        phone: values.phoneNum,
      };
      // this.getCorrectPassword();
      this.setState({
        loading: true
      });
      const res = await api.post('/sendOtp',{ phone : values.phoneNum}).then((d)=> {
        return d;
      });
      
      const userData = JSON.stringify(res.data.user);
      
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


  setType = async (type) => {
      const { navigation} = this.props;
    await AsyncStorage.setItem('type', type).then((data)=> {
        navigation.navigate('LoginPage');
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

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F7F7F7',justifyContent:'space-between' }}>
              <View style={{ flex: 3, backgroundColor:'#FAF3EB',padding:20,justifyContent:'space-between' }} >
              <Image style={{width:200,height:200,alignSelf:'center',justifyContent:'center',borderRadius:100,marginTop:100}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
              <TouchableOpacity 
              onPress={()=> this.setType('customer')}
                //   onPress={props.handleSubmit} 
                  style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:100 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
              onPress={()=> this.setType('vendor')}
                //   onPress={props.handleSubmit} 
                  style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:50 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Vendor</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }} >
                  <Image style={{position:'absolute',zIndex:-10,height:800,width:800,marginLeft:-200,marginTop:-250,backgroundColor:'#ffe9c9',opacity:0.5}}  resizeMode={'contain'} source={require('../assets/images/chicken.jpeg')} />
                </View>
              </View>
            </View>

    );

  }
}


export default ChooseTypeScreen;

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



class RenderInitialScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount = async () => {
    // const { route } = this.props;
    const  { navigation} = this.props;
    const userData =  await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    const type =  await AsyncStorage.getItem('type');
    // alert(userData);
    if(userData!= null && type!=null) {
    if(userData!="" && type!="" & parsedData.phone!="" && type=='customer') {
        navigation.navigate('AppDrawer');
    } else if (userData!="" && type!="" && parsedData.phone!="" && type=='vendor') {
        navigation.navigate('VendorAppDrawer');
    } 
    }else {
        navigation.navigate('ChooseTypePage');
    }
  }





  render() {
    const { navigation } = this.props;
    const { modalVisible, callingCode, cca2, loading } = this.state;
    return (
      <View style={{flex:1}}>
            </View>

    );

  }
}


export default RenderInitialScreen;

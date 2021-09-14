import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class OtpPage extends React.Component {
   state={
     correctOtp : '',
     userId : ''
   };


   
   componentDidMount() {
    this.renderData();
   }

   renderData = async () => {
    const savedData = await AsyncStorage.getItem('userData');
    const data = JSON.parse(savedData);
    this.setState({
      correctOtp : data.otp,
      userId : data.id
    })
   }

    render() {
      const {navigation} = this.props;
      const { correctOtp,userId } = this.state;
      return (
        <OTPScreen userId={userId} correctOtp={correctOtp} navigation={navigation} />
      );
    }
  }




export default OtpPage;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    image: {
        width: 180,
        resizeMode: 'contain'
      },
      logo: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }
  })

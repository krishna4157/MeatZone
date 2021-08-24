import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';

class InitialScreen extends React.Component {
   state={

   };


   
   async componentDidMount() {
     
   }

    render() {
      const {navigation} = this.props;
      return (
        // <LoginScreen navigation={navigation} />
        <OTPScreen navigation={navigation} />
      );
    }
  }




export default InitialScreen;

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

import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditProfileScreen from '../components/EditProfileScreen';
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import VendorShopScreen from '../components/VendorShopScreen';

class VendorShopPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
     
   }

    render() {
      const {navigation} = this.props;
      return (
        <VendorShopScreen navigation={navigation} />
      );
    }
  }




export default VendorShopPage;

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

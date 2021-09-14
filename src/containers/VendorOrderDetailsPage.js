import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import Toast from 'react-native-toast-message';
import VendorDetailsScreen from '../components/VendorDetailsScreen';
import VendorCategoryCreateScreen from '../components/VendorCategoryCreateScreen';
import VendorOrderDetailsScreen from '../components/VendorOrderDetailsScreen';

class VendorOrderDetailsPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
    
   }

    render() {
      const {navigation,route} = this.props;
      
      return (
        <VendorOrderDetailsScreen route={route} navigation={navigation} />
      );
    }
  }




export default VendorOrderDetailsPage;

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

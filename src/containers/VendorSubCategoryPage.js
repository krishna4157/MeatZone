import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import Toast from 'react-native-toast-message';
import VendorDetailsScreen from '../components/VendorDetailsScreen';
import VendorCategoryScreen from '../components/VendorCategoryScreen';
import VendorOrderScreen from '../components/VendorOrderScreen';
import VendorSubCategoryScreen from '../components/VendorSubCategoryScreen';

class   VendorSubCategoryPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
    
   }

    render() {
      const {navigation,route} = this.props;
      
      return (
        <VendorSubCategoryScreen route={route} navigation={navigation} />
      );
    }
  }




export default VendorSubCategoryPage;

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

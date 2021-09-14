import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreens';
import OTPScreen from '../components/OTPScreen';
import ProductOnFocusScreen from '../components/ProductOnFocusScreen';

class ProductOnFocusPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
     const  { route, navigation} = this.props;

   }

    render() {
      const {navigation} = this.props;
      return (
        <ProductOnFocusScreen navigation={navigation} />
      );
    }
  }




export default ProductOnFocusPage;

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

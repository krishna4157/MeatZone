import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import ShopScreen from '../components/ShopScreen';

class ShopPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
     
   }

    render() {
      const {navigation} = this.props;
      return (
        <ShopScreen navigation={navigation} />
      );
    }
  }




export default ShopPage;
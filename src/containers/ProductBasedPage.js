import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import ProductBasedScreen from '../components/ProductBasedScreen';
import { increment } from '../actions/counter';
import { connect } from 'react-redux';

class ProductBasedPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
    const {navigation, route} = this.props;
                 
   }

    render() {
      const {navigation, route,increment} = this.props;
      
      // const id = navigation.getParam('id');
      return (
        <ProductBasedScreen increment={increment} route={route} navigation={navigation} />
      );
    }
  }

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
        increment,
    },
    dispatch,
  );
  


export default connect(null,mapDispatchToProps)(ProductBasedPage);

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

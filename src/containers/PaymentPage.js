import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartScreen from '../components/CartScreen';
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { increment, storeCount } from '../actions/counter';
import PaymentScreen from '../components/PaymentScreen';

class PaymentPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
     
   }

    render() {
      const {navigation, storeCount, counter, route} = this.props;
      return (
        <PaymentScreen storeCount={storeCount} route={route} navigation={navigation} />
      );
    }
  }


  const mapStateToProps = state => ({
    counter: state.counter,
});


  const mapDispatchToProps = dispatch => bindActionCreators(
    {
        increment,
        storeCount
    },
    dispatch,
  );

export default connect(mapStateToProps,mapDispatchToProps)(PaymentPage);

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


import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreens';
import OTPScreen from '../components/OTPScreen';
import api from '../utils/api';
import { storeCount } from '../actions/counter';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MainPage extends React.Component {
   state={

   };


   
    componentDidMount = async () => {
      const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');

      const res = await api.get(`/myProfile`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });
    const data = JSON.stringify(res.data);
    await AsyncStorage.setItem("userDetails", data);
    }

    render() {
      const {navigation, storeCount, counter} = this.props;
      return (
        <MainScreen navigation={navigation} storeCount={storeCount} counter={counter} />
      );
    }
  }


  const mapStateToProps = state => ({
    counter: state.counter,
});


  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      storeCount,
    },
    dispatch,
  );



  export default connect(mapStateToProps,mapDispatchToProps)(MainPage);


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

import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import ShopScreen from '../components/ShopScreen';
import { storeCount } from '../actions/counter';
import FavScreen from '../components/FavScreen';

class FavPage extends React.Component {
   state={

   };


   
   async componentDidMount() {
     
   }

    render() {
      const {navigation, storeCount, counter} = this.props;
      return (
        <FavScreen navigation={navigation} storeCount={storeCount} counter={counter}/>
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



  export default connect(mapStateToProps,mapDispatchToProps)(FavPage);


// export default FavPage;
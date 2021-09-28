import { DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import IntroScreen from './src/components/IntroScreen';
import LoginScreen from './src/components/LoginScreen';
import OTPScreen from './src/components/OTPScreen';
import AppNavigation from './src/containers/AppNavigator';
import Container from './src/containers/NavigationScreens';
import allReducers from './src/reducers/allreducers';
import { createStore } from "redux";
import Toast from 'react-native-toast-message';


class App extends React.Component {
  
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    // await Font.loadAsync({ 'FontAwesome': require('@expo/vector-icons/FontAwesome') })
    this.setState({ isFontLoaded: true })
  }

  


  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'MaterialIcons': require('@expo/vector-icons/MaterialIcons'),
      'FontAwesome': require('@expo/vector-icons/FontAwesome5'),
    })
    this.setState({ fontLoaded: true })
  }

  async componentDidMount() {

  }

  render() {
    const store = createStore(
      allReducers,
    );
    return (
      <Provider store={store} >
      <SafeAreaView style={{flex:1}}>
      <Toast ref={(ref) => Toast.setRef(ref)} style={{zIndex:10,paddingTop:5}} />
      <Container  />
      </SafeAreaView>
      </Provider>
    );
  }
}



export default App;

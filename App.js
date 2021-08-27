import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './src/components/IntroScreen';
import LoginScreen from './src/components/LoginScreen';
import OTPScreen from './src/components/OTPScreen';
import AppNavigation from './src/containers/AppNavigator';
import Container from './src/containers/NavigationScreens';

class App extends React.Component {
  state = {
    fontLoaded: false
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
    return (
      <Container />
    );
  }
}




export default App;

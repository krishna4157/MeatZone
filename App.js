import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/LoginScreen';
import OTPScreen from './src/components/OTPScreen';
import AppNavigation from './src/containers/AppNavigator';

export default function App() {
  return (
    <View style={{flex:1,backgroundColor:'red'}}>
     <OTPScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

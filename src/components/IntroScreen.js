import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/images/meat.png'),
    backgroundColor: 'white',
  },
  // {
  //   key: 2,
  //   title: 'Title 2',
  //   text: 'Other cool stuff',
  //   image: require('../assets/images/acslogo.png'),
  //   backgroundColor: '#febe29',
  // },
  // {
  //   key: 3,
  //   title: 'Rocket guy',
  //   text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
  //   image: require('../assets/images/acslogo.png'),
  //   backgroundColor: '#22bcb5',
  // }
];


class IntroScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    type : ''
    }
  }

  componentDidMount = async() => {
    const type = await AsyncStorage.getItem('type');
    this.setState({
      type : type
    });
  }

 
  _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, marginTop: 50, backgroundColor: 'white' }}>
        <View style={{ flex: 5.5, backgroundColor: 'white' }}>
          <View style={{ flex: 3, backgroundColor: 'white' }}>
            <Image style={{ alignSelf: 'center', width: 300, height: 300 }} source={item.image} resizeMode="contain" />
          </View>
          <View style={{ flex: 3, backgroundColor: 'white', marginTop: 30 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Choose a fresh Meat</Text>
            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 15, color: 'grey', padding: 20 }}>These are the best quality meat you can get. We choose the shops that are best at selling meet to customers.</Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    );
  }

  setNavigation = () => {
    const  { type } = this.state;
    const { navigation} = this.props;
    if(type == 'vendor') {
      navigation.navigate('VendorAppDrawer');    
     } else {
      navigation.navigate('AppDrawer'); 
     } 
  }


  renderButton = () => {
    const { navigation} = this.props;
    const { type} = this.state;
    
    return (
      <TouchableOpacity onPress={() => {
        this.setNavigation();
      }
        } style={{borderWidth:2,padding:10,borderRadius:10}}>
        <Text style={{fontSize:15}}>{'    '}Done{'    '}</Text>
      </TouchableOpacity>
    )
  }





  render() {
    const { navigation } = this.props;
    const { type } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
        <View style={{ flex: 0.2, marginTop: 10, flexDirection: 'row-reverse' }}>
          <TouchableOpacity onPress={() => 
            this.setNavigation()
            } >
            <Text style={{ color: 'red', fontSize: 18 }}>
              {'Skip >>  '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5.8 }}>
          <AppIntroSlider
            onDone={() =>{} 
              // navigation.navigate('LocationPage')
              // navigation.navigate('VendorAppDrawer')
            }
            doneLabel = {'Done'}
            showDoneButton={true}
            renderDoneButton = {this.renderButton}
            activeDotStyle={{ width: 50, backgroundColor: 'green', marginLeft: -10, zIndex: 10 }}
            dotStyle={{ width: 50, backgroundColor: '#C9CCD5', marginLeft: -10 }}
            renderItem={this._renderItem} data={slides} />
        </View>
      </View>
    );

  }
}

export default IntroScreen;

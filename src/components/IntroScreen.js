import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/images/acslogo.png'),
    backgroundColor: 'white',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/images/acslogo.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../assets/images/acslogo.png'),
    backgroundColor: '#22bcb5',
  }
];


class IntroScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

 
  _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, marginTop: 50, backgroundColor: 'white' }}>
        <View style={{ flex: 5.5, backgroundColor: 'white' }}>
          <View style={{ flex: 3, backgroundColor: 'white' }}>
            <Image style={{ alignSelf: 'center', width: 280, height: 280 }} source={item.image} resizeMode="contain" />
          </View>
          <View style={{ flex: 3, backgroundColor: 'white', marginTop: 30 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Discover place near you</Text>
            <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 15, color: 'grey', padding: 20 }}>Discover place near you lfsnflsnfskfnss skf nsfks fskf sfks fskf sdfksd fsdkf sdfsdf sfksd fskf sdfks </Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    );
  }





  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
        <View style={{ flex: 0.2, marginTop: 30, flexDirection: 'row-reverse' }}>
          <TouchableOpacity onPress={() => navigation.navigate('LocationPage')} >
            <Text style={{ color: 'red', fontSize: 18 }}>
              {'Skip >>  '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5.8 }}>
          <AppIntroSlider
            onDone={() => alert('page ended')}
            activeDotStyle={{ width: 50, backgroundColor: 'green', marginLeft: -10, zIndex: 10 }}
            dotStyle={{ width: 50, backgroundColor: '#C9CCD5', marginLeft: -10 }}
            renderItem={this._renderItem} data={slides} />
        </View>
      </View>
    );

  }
}

export default IntroScreen;

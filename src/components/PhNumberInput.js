import React from 'react';
import { View, Keyboard, Image, TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Input, Item, Button, Text, Icon, Card, CardItem, Body } from 'native-base';

import Flag from 'react-native-flags';

var number = "";
class PhNumberInput extends React.Component {

  state = {
    phoneCode: '',
    phoneNumber: ''
  }

  componentDidMount() {
    const { callingCode } = this.props;
    const phoneCode = callingCode;
    this.setState({
      phoneCode,
    })
  }

  componentDidUpdate(prevProps) {
    const { callingCode } = this.props;
    const phoneCode = callingCode
    if (prevProps.callingCode !== callingCode)
      this.setState({
        phoneCode,
      })
  }

  getPhoneData = async () => {
    const { phoneCode, phoneNumber } = this.state;
    const { getPhoneValue } = this.props;
    const phNo = phoneCode + phoneNumber;
    getPhoneValue(phNo);
  }

  render() {
    const { getPhoneValue, t, fromPinChange, triggerModal, cca2 } = this.props;
    const { phoneNumber, phoneCode } = this.state;
    return (
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', borderRadius: 15 }}>
          <TouchableOpacity onPress={() => triggerModal()} style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center' }} >
            <View style={{ justifyContent: 'center', padding: 2}}>
              <Flag
                style={{marginLeft:5}}
                code={cca2}
                size={32}
              />
            </View>
            <View style={{ borderBottomWidth: 0, justifyContent: 'center', paddingLeft: 10 }}>
              <Text>{phoneCode}</Text>
            </View>
          </TouchableOpacity>
          <Item style={{ borderBottomWidth: 0, flex: 4.4 }}>
            <Input
              autoFocus={true}
              maxLength={10}
              placeholder={'Mobile Number'}
              keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={fromPinChange ? { color: 'black', width: '10%' } : { color: 'black' }}
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                });
                getPhoneValue(phoneCode, value);
              }}
            />
          </Item>
        </View>
      </View>

    );
  }
}

export default PhNumberInput;

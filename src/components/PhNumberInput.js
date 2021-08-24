import React from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';

import Flag from 'react-native-flags';

var number = "";
class PhNumberInput extends React.Component {

  state = {
    phoneCode : '',
    phoneNumber: ''
  }

  componentDidMount() {
    const { callingCode } = this.props;
    const phoneCode =  callingCode;
    this.setState({
      phoneCode,
    })
  }

  componentDidUpdate(prevProps) {
    const { callingCode } = this.props;
    const phoneCode = callingCode
    if(prevProps.callingCode !==callingCode)
      this.setState({
        phoneCode,
      })
  }

    getPhoneData = async() => {
      const  {phoneCode, phoneNumber} = this.state;
      const { getPhoneValue } = this.props;
      const phNo = phoneCode+phoneNumber;
      getPhoneValue(phNo);
    }
    
    render(){
      const { getPhoneValue,t,fromPinChange } = this.props;
      const {phoneNumber,phoneCode} = this.state;
        return (
             <View style={{padding:10}}>
               <View style={{flexDirection:'row',width:'100%',backgroundColor:'white',borderRadius:15}}>
               <TouchableOpacity onPress={()=> alert('hello')} style={{ flex:1.5,flexDirection:'row',justifyContent:'center'}} >
              <View style={{justifyContent:'center',paddingLeft:5}}>
               <Flag
    code="IN"
    size={32}
  />
  </View>
               <View style={{ borderBottomWidth: 0,flex:1,justifyContent:'center',paddingLeft:10}}>
               <Text>{phoneCode}</Text>
                               {/* <Input
                               style={{textAlign:'center',alignItems:'center'}}
                               maxLength={5} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                              //  style={{color:'black'}}
                               value={phoneCode}
                               onChangeText={(value)=>{
                                 this.setState({
                                   phoneCode: value
                                 });
                                 getPhoneValue(value,phoneNumber);
                               }} 
                               /> */}
                           </View>
                           </TouchableOpacity>
                           <View style={{flex:0.1,justifyContent:'center',alignContent:'center'}}>
                           <Text style={{fontSize:25,textAlign:'center'}}>-</Text>
                           </View>
                           <Item style={{ borderBottomWidth: 0,flex:4.4}}>
                               <Input
                               maxLength={10}
                               placeholder={'Mobile Number'} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                               style={fromPinChange ? {color:'black',width:'10%'} : {color:'black'}} 
                               onChangeText={(value)=>{
                                this.setState({
                                  phoneNumber: value
                                });
                                getPhoneValue(phoneCode,value);
                              }} 
                               />
                           </Item>
                           </View>
             </View>   
            
        );
    }
}

export default PhNumberInput;

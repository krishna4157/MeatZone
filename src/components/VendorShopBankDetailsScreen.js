import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item, Card } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



class VendorShopBankDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false,
      fullName : '',
      email : '',
      phoneNumber : ''
    }
  }

  componentDidMount = async () => {
   const data = await AsyncStorage.getItem('userData');
    const res = JSON.parse(data);
    this.setState({
      fullName : res.name,
      email : res.email,
      phoneNumber : res.phone
    });
  }


  getCorrectPassword = async () => {
    const { navigation } = this.props;
    // this.setState({
    //   statusColor: 'blue'
    // });
    // alert('hello');
    // navigation.navigate("KycScreen");

  }


  getWrongPassword = (e) => {
    this.setState({
      statusColor: 'blue'
    });
    this.setState({
      isSuccess: 0
    });
    // this.StartBackgroundColorAnimation()

    setTimeout(() => {

      this.setState({
        isSuccess: 2
      })
    }, 10000);



  }




  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }



  checkValues = async (values) => {
    alert(JSON.stringify(values));
    try {
      const data = {
        "name": values.fullName,
        "email": values.email,
        "phone":values.phoneNumber,
        "location":"Airport Ring Road, Odhav Vandana II, Bhuj, Gujarat",
        "latitude":"23.271342200671988 ",
        "longitude":"69.66265632536503"
    }
    const res = await api.post('/editProfile',data);
    alert(JSON.stringify(res.data));

    } catch (e) {
      console.log(e);
      this.getWrongPassword(e);
    }
  }

  triggerModal = () => {
    this.setState({
      modalVisible : true
    });
  }

  changeCallCodeAndFlag = (cca2,cc) => {
    this.setState({
      callingCode : '+'+cc,
      cca2 : cca2
    });
  }


  render() {
    const { navigation } = this.props;
    const { modalVisible, callingCode, cca2,fullName,email,phoneNumber } = this.state;
    return (

      <Formik
        initialValues={{
          fullName: fullName, email: email,phoneNumber: phoneNumber
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required('enter username'),
          email: Yup.string()
            .required('enter email'),
          phoneNumber: Yup.string()
            .required('enter email'),  
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            this.checkValues(values);
            formikActions.setSubmitting(false);
          }, 500);
        }}>
        {props => {
          const {
            setFieldValue, setValues
          } = props;
          const setItemValue = (name,value) => {
            setFieldValue(
              name, value)
          }

          return (

            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffe9c9', padding: 20 }}>
              <View style={{ flex: 1, backgroundColor: 'grey', backgroundColor: '#ffe9c9',justifyContent:'center' }} >
                  <Text style={{fontSize:30}}>Bank Details</Text>
              </View>
              <Card style={{borderRadius:15,borderWidth:2,borderColor:'red'}}>
              <View style={{ flex: 2, flexDirection: 'row' }} >
                <View style={{ flex: 2, flexDirection: 'column',padding:10 }}>
                <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Account Name </Text>
                  <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            <Input
              value={fullName}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Full Name'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black',borderColor:'red',borderWidth:1,borderRadius:15 }}
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                });
                setItemValue('fullName',value);
              }}
            />
          </Item>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Account Number </Text>
          <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            
            <Input
            value={email}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Email Address'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black',borderColor:'red',borderWidth:1,borderRadius:15 }}
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                });
                setItemValue('email',value);
              }}
            />
          </Item>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>IFSC Code </Text>
          
          <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            <Input
            value={phoneNumber}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Phone Number'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black',borderColor:'red',borderWidth:1,borderRadius:15 }}
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                });
                setItemValue('phoneNumber',value);
              }}
            />
          </Item>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>UPI id </Text>
          
          <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            <Input
            value={phoneNumber}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Phone Number'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black',borderColor:'red',borderWidth:1,borderRadius:15 }}
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                });
                setItemValue('phoneNumber',value);
              }}
            />
          </Item>
          
                  
                  <TouchableOpacity  style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:40,marginBottom:40 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>UPDATE</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </Card>
            </ScrollView>

          )
        }}
      </Formik>
    );

  }
}


export default VendorShopBankDetailsScreen;

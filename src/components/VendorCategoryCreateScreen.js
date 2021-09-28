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
import RadioForm from 'react-native-simple-radio-button';



class VendorCategoryCreateScreen extends React.Component {

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




  


  checkValues = async (values) => {
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

    var radio_props = [
        {label: 'Active    ', value: 0 },
        {label: 'Not Active', value: 1 }
      ];
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

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffe9c9', padding: 20,justifyContent:'space-between' }}>
              <View style={{ flex: 2, backgroundColor: '#ffe9c9', flexDirection: 'row' }} >
                <View style={{ flex: 2, flexDirection: 'column',padding:10 }}>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:18,padding:5,textAlign:"center"}}>CREATE CATEGORY</Text>  
                </View>
                <View style={{flexDirection:'row',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5,width:'30%'}}>Category </Text>
          <Input style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5,width:'30%',marginTop:10}}>Status </Text>
          <View style={{marginTop:10}}>
          <RadioForm
  radio_props={radio_props}
  initial={0}
  
  formHorizontal={true}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  onPress={(value) => {this.setState({value:value})}}
/>
</View>
        </View>
                  
                  <TouchableOpacity onPress={()=> navigation.navigate("VendorDetailsPage")} style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:40 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>CREATE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          )
        }}
      </Formik>
    );

  }
}


export default VendorCategoryCreateScreen;

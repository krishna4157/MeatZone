import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



class EditProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName : '',
      email : '',
      phoneNumber : '',
      loading: false
    }
  }

  componentDidMount = async () => {
    this.checkInitialValues();
  }


  checkInitialValues = async () => {
    const { loading} = this.state;
    this.setState({
      loading: true
    })
   const data = await AsyncStorage.getItem('userData');
    const res = JSON.parse(data);
    this.setState({
      fullName : res.name,
      email : res.email,
      phoneNumber : res.phone
    });

    this.setState({
      loading: false
    });
    const result = {
      fullName : res.name,
      email : res.email,
      phoneNumber : res.phone
    }
    return result;
  }


  getValues = () => {
   const { fullName, email, phoneNumber} = this.state;
    const result = {
      fullName : fullName,
      email : email,
      phoneNumber : phoneNumber
    }
    return result;
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
    const { navigation } = this.props;
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
      loading : true
    })
    try {
      const data = {
        "name": values.fullName,
        "email": values.email,
        "phone":values.phoneNumber,
        "location":"Airport Ring Road, Odhav Vandana II, Bhuj, Gujarat",
        "latitude":"23.271342200671988 ",
        "longitude":"69.66265632536503"
    }
    const res = await api.post('/editProfile',data,
      {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    }
    );

    Toast.show({
      type: 'success',
      text1: 'Profile Updated Successfully',
      // text2: 'This is some something 👋'
    });
    navigation.goBack();

    } catch (e) {
      console.log(e);
      this.getWrongPassword(e);
    }
    this.setState({
      loading: false
    });
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

  setInitialValues = () => {
    const initialValues = {
        userName: '',
        password: ''
    };
    return initialValues;
}


  render() {
    const { navigation } = this.props;
    const { modalVisible, callingCode, cca2,fullName,email,phoneNumber, loading } = this.state;
    
    return (

      <Formik
      enableReinitialize
        initialValues={this.getValues()}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .required('enter username'),
          email: Yup.string()
            .required('enter email'),
          phoneNumber: Yup.string()
            .required('enter phone Number'),  
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
              {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
              <View style={{ flex: 1, backgroundColor: 'grey', backgroundColor: '#ffe9c9',justifyContent:'center' }} >
                <Image style={{width:200,height:190,alignSelf:'center',justifyContent:'center'}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
              </View>
              <View style={{ flex: 2, backgroundColor: '#ffe9c9', flexDirection: 'row' }} >
                <View style={{ flex: 2, flexDirection: 'column',padding:10 }}>
                <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Name </Text>
                  <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            <Input
              value={props.values.fullName}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Full Name'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black' }}
              onChangeText={(value) => {
                setItemValue('fullName',value);
              }}
            />
          </Item>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Email </Text>
          <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            
            <Input
              value={props.values.email}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Email Address'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black' }}
              onChangeText={(value) => {
                
                setItemValue('email',value);
              }}
            />
          </Item>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Phone Number </Text>

          <Item style={{ borderBottomWidth: 0,backgroundColor:'white',borderRadius:10 }}>
            <Input
              value={props.values.phoneNumber}
              autoFocus={true}
              // maxLength={10}
              placeholder={'Enter Phone Number'}
              // keyboardType="number-pad"
              placeholderTextColor='#bdbdbd'
              style={{ color: 'black' }}
              onChangeText={(value) => {
                setItemValue('phoneNumber',value);
              }}
            />
          </Item>
                  
                  <TouchableOpacity onPress={props.handleSubmit} style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:40 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>SAVE</Text>
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


export default EditProfileScreen;

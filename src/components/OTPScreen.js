import { Formik } from 'formik';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
// import Flag from 'react-native-flags';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/vendorApi';



class OTPScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      modalVisible: false,
      loading: false
    }
  }

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('userData');
    alert(data);
  }

  checkOtp = async (values) => {
    const { navigation, correctOtp, userId } = this.props;
    try {
      const user = {
        "user_id": userId,
    "otp": values.otp, 
      };

      this.setState({
        loading: true
      })
      await AsyncStorage.setItem('accessToken',"");


      // alert(values.otp);
      // this.getCorrectPassword();
      const res = await api.post('/verifyOtp',user).then((d)=> {
        // alert(JSON.stringify(d));
        return d;
      });
      this.setState({
        loading: false
      })
      
      alert(JSON.stringify(res));
      // res.data.access_token
      // const userData = JSON.stringify(res.data.user);
      // alert(JSON.stringify(userData));
      await AsyncStorage.setItem('accessToken', res.data.access_token).then((data)=> {
        alert(JSON.stringify(res.data.access_token));
      navigation.navigate('IntroPage')
      });
      // navigation.navigate('OTPPage');
      
  } catch (e) {
    this.setState({
      loading: false
    })
    
    console.log(e);
  }
}







  render() {
    const { navigation } = this.props;
    const { modalVisible, loading } = this.state;
    return (
      <View style={{flex:1}}>
        {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
      <Formik
        initialValues={{
          otp: '',
        }}
        validationSchema={Yup.object({
          otp: Yup.string()
            .required('enter username'),
         
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            this.checkOtp(values);
            formikActions.setSubmitting(false);
          }, 500);
        }}>
        {props => {
          const {
            setFieldValue, setValues
          } = props;
          const getOtpValue = (otp) => {
            setFieldValue(
              'otp', otp)
          }

          return (

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 20 }}>
              <View style={{ flex: 1, justifyContent: 'space-around' }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'red', fontSize: 18 }} >
                    {'< Back'}
                  </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>

                    Verify your Phone Number
                  </Text>

                  <Text>
                    Enter your OTP code here
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.8, flexDirection: 'row' }} >

                <CodeInput
                  onFulfill={(data) => {
                    getOtpValue(data);
                   }}
                  //   ref="codeInputRef2"
                  keyboardType="numeric"
                  codeLength={4}
                  space={50}
                  className={'border-b'}
                  inactiveColor={'grey'}
                  activeColor={'grey'}
                  //   className='border-circle'
                  // compareWithCode='1234'
                  autoFocus={false}
                  codeInputStyle={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}
                //   onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                />

              </View>
              <View style={{ flex: 4.2 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 30 }}>
                  <Text>
                    Didnt recieve the OTP ?
                  </Text>
                  <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: 'red' }}> Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={props.handleSubmit} style={{ width: '100%', backgroundColor: 'red', padding: 15, borderRadius: 15 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Verify Now</Text>
                </TouchableOpacity>
              </View>
            </View>

          )
        }}
      </Formik>
      </View>
    );

  }
}

export default OTPScreen;

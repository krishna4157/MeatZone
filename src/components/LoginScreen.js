import { Formik } from 'formik';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Image } from 'react-native';
// import Flag from 'react-native-flags';
import api from '../utils/api';
import vendorApi from '../utils/vendorApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false,
      loading: false
    }
  }

  componentDidMount = async () => {
    const { route } = this.props;
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

  checkApi = async (values) => {
    const { navigation} = this.props;

    const type = await AsyncStorage.getItem('type');
    if(type == 'vendor') {
    const data = await vendorApi.post('/sendOtp',{ phone : values.phoneNum}).then((d)=> {
    return d;
  });
  const userData = JSON.stringify(data.data.user);
      
      await AsyncStorage.setItem('userData', userData).then((data)=> {
        this.setState({
          loading: false
        });
        
        navigation.navigate('OTPPage');
      });
 } else {
    const data = await api.post('/sendOtp',{ phone : values.phoneNum}).then((d)=> {
    return d;
    });
    const userData = JSON.stringify(data.data.user);
      
      await AsyncStorage.setItem('userData', userData).then((data)=> {
        this.setState({
          loading: false
        });
        
        navigation.navigate('OTPPage');
      });
  }
  }





  checkValues = async (values) => {
    const { navigation} = this.props;
    const type = await AsyncStorage.getItem('type');
    try {
      const user = {
        phone: values.phoneNum,
      };
      // this.getCorrectPassword();
      this.setState({
        loading: true
      });
     return this.checkApi(values);
      
      
      // navigation.navigate('OTPPage');
      
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
    const { modalVisible, callingCode, cca2, loading } = this.state;
    return (
      <View style={{flex:1}}>
      {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
               <ActivityIndicator size="large" color="red" />
              </View>}
      <Formik
        initialValues={{
          phoneNum: '',
        }}
        validationSchema={Yup.object({
          phoneNum: Yup.string()
            .required('Enter Phone Number'),
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
          const getPhoneValue = (value, number) => {
            setFieldValue(
              'phoneNum', number)
          }

          return (

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F7F7F7',justifyContent:'space-between' }}>
              <View style={{ flex: 3, backgroundColor:'#FAF3EB',padding:20 }} >
              <Image style={{width:200,height:200,alignSelf:'center',justifyContent:'center',borderRadius:50}} source={require('../assets/AppIcons/web_hi_res_512.png')} />

              </View>
              <View style={{ flex: 2, flexDirection: 'row' }} >
                <View style={{ flex: 2, flexDirection: 'column',padding:10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                    Enter Mobile Number
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    We will send you an one one time password on this mobile number.
                  </Text>
                  <PhNumberInput
                    triggerModal={this.triggerModal}
                    callingCode={callingCode}
                    cca2={cca2}
                    getPhoneValue={getPhoneValue}
                    modalVisible={modalVisible} />
                  <CountryPicker
                    withCloseButton={true}
                    withFilter={true}
                    filterProps={{
                      style: {
                        paddingVertical: 20
                      }
                    }}
                    withFlag={true}
                    visible={modalVisible}
                    onSelect={value => {
                      this.changeCallCodeAndFlag(value.cca2,value.callingCode);
                    }}
                    withCountryNameButton={false}
                    placeholder=''
                    onClose={() => {
                      this.setState({
                        modalVisible: false,
                      })
                    }}
                    withCallingCode={true}
                    withEmoji={true}
                  />
                  <Image style={{position:'absolute',zIndex:-10,height:800,width:800,marginLeft:-200,marginTop:-250,backgroundColor:'#ffe9c9',opacity:0.5}}  resizeMode={'contain'} source={require('../assets/images/chicken.jpeg')} />

                  <TouchableOpacity onPress={props.handleSubmit} style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Get OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          )
        }}
      </Formik>
      </View>
    );

  }
}


export default LoginScreen;

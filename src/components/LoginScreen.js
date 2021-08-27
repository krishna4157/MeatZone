import { Formik } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Image } from 'react-native';
// import Flag from 'react-native-flags';



class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false
    }
  }

  componentDidMount = async () => {

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
    try {
      const user = {
        userID: values.userID,
        loginPassword: values.password
      };
      this.getCorrectPassword();

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
    const { modalVisible, callingCode, cca2 } = this.state;
    return (

      <Formik
        initialValues={{
          userID: '', password: '',
        }}
        validationSchema={Yup.object({
          userID: Yup.string()
            .required('enter username'),
          password: Yup.string()
            .required('enter password'),
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
          const getPhoneValue = (value, userID) => {
            setFieldValue(
              'userID', value + userID)
          }

          return (

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffe9c9', padding: 20,justifyContent:'space-between' }}>
              <View style={{ flex: 4, backgroundColor: 'grey', backgroundColor: '#ffe9c9' }} >

              </View>
              <View style={{ flex: 2, backgroundColor: '#ffe9c9', flexDirection: 'row' }} >
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
                  <Image style={{position:'absolute',zIndex:-10,height:800,width:800,marginLeft:-200,marginTop:-250,opacity:0.5}}  resizeMode={'contain'} source={require('../assets/images/chicken.jpeg')} />

                  <TouchableOpacity onPress={() => navigation.navigate('OTPPage')} style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Get OTP</Text>
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


export default LoginScreen;

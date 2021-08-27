import { Formik } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
// import Flag from 'react-native-flags';
import CodeInput from 'react-native-confirmation-code-input';



class OTPScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      modalVisible: false
    }
  }

  componentDidMount = async () => {

  }







  render() {
    const { navigation } = this.props;
    const { modalVisible } = this.state;
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
                  onFulfill={() => { }}
                  //   ref="codeInputRef2"
                  keyboardType="numeric"
                  codeLength={4}
                  space={50}
                  className={'border-b'}
                  inactiveColor={'grey'}
                  activeColor={'grey'}
                  //   className='border-circle'
                  compareWithCode='1234'
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
                <TouchableOpacity onPress={() => navigation.navigate('IntroPage')} style={{ width: '100%', backgroundColor: 'red', padding: 15, borderRadius: 15 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Verify Now</Text>
                </TouchableOpacity>
              </View>
            </View>

          )
        }}
      </Formik>
    );

  }
}

export default OTPScreen;

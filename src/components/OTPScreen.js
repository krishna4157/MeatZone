import { Formik } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
// import Flag from 'react-native-flags';



class OTPScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isPasswordVisible : false,
        modalVisible : false
    }
  }

  componentDidMount = async () => {
   
  }


  getCorrectPassword = async() => {
    const {navigation}= this.props;
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
        isSuccess:2
      })
    }, 10000);
    


  }

  


  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }


    
  checkValues = async (values) => {
   try {
      const user  = {
        userID : values.userID,
        loginPassword: values.password 
      };
    //   const res = await api.post("/login",user);
    //   console.log(res.data);
      this.getCorrectPassword();
    
    } catch(e) {
      console.log(e);
      this.getWrongPassword(e);
    }
  }
    
      
    render(){
        const {  navigation } = this.props;
        const  { modalVisible} = this.state;
      return (
       
        <Formik
        initialValues={{ userID: '', password: '' ,
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
        {props =>{
           const {
             setFieldValue,setValues
          } = props;
          const getPhoneValue=(value,userID)=>{
            setFieldValue(
                  'userID',value+userID)
          }
        
          return (

            <View style={{flex:1,flexDirection:'column',backgroundColor:'red',padding:20}}>
              <View style={{flex:4,backgroundColor:'grey',backgroundColor:'#ffe9c9'}} >
              
              </View>
              <View style={{flex:3,backgroundColor:'#ffe9c9',flexDirection:'row'}} >
              <View style={{flex:2,flexDirection:'column'}}>
              <Text style={{fontWeight:'bold',fontSize:25}}>
                Enter Mobile Number
              </Text>
              <Text style={{marginBottom:10}}>
                We will send you an one one time password on this mobile number.
              </Text>
              <PhNumberInput 
                      // deviceLocation={deviceLocation}
                      callingCode={'+91'}
                      getPhoneValue={getPhoneValue}  />
                     


                     <CountryPicker
                     with
                    withCloseButton={true}
                    withFilter={true}
                    filterProps={{
                        style:{
                        paddingVertical: 20
                        }
                    }}
                    withFlag={true}
                        visible={true}
                        onSelect={value => {
                        // this.selectCountry(value)
                        // onCountryChange();
                        }}
                        // cca2={this.state.cca2}
                        withCountryNameButton={false}
                        placeholder=''
                        onClose={() => {
                        // this.setState({
                        //     modalVisible: false,
                        // })
                        }}
                        withCallingCode={true}
                        withEmoji={true}
                    />
                       
              <TouchableOpacity style={{borderRadius:15,width:'95%',backgroundColor:'red',padding:15,alignSelf:'center'}}>
                <Text style={{color:'white',textAlign:'center'}}>Get OTP</Text>
              </TouchableOpacity>
              </View>
              </View>
              </View>
              
        )}}
      </Formik>
                  );

    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',

  },
  contentContainer: {
      paddingTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 10,
  },
  left : {
    paddingLeft:10
  },
  text: {
      fontSize: 15, lineHeight: 23, padding: 10
  },
});


export default OTPScreen;

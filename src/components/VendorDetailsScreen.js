import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/vendorApi';
import AsyncStorage from '@react-native-async-storage/async-storage';



class VendorDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cca2 : 'IN',
      callingCode: '+91',
      modalVisible: false,
      fullName : '',
      email : '',
      phoneNumber : '',
      userData : '',
      moreData : '',
      loading : false
    }
  }

  componentDidMount = async () => {
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
      loading : true
    })
    const res = await api.get(`/myProfile`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });

    this.setState({
      userData : res.data.user
    });
    this.setState({
      moreData : res.data.more
    });
    this.setState({
      loading : false
    })

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
    const { modalVisible, callingCode, cca2,fullName,email,phoneNumber, userData, moreData,loading } = this.state;
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

            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffe9c9', padding: 20}}>
               {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Name</Text>
                         <Text style={{width:'30%'}}>{moreData.restaurant_name}</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10,justifyContent:'center'}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Status</Text>
                         <View style={{width:'70%'}}>
                         <Text style={{width:'50%',backgroundColor:'red',textAlign:'center',padding:10,borderRadius:10,color:'white'}}>{moreData.status}</Text>
                         </View>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Image</Text>
                         <View style={{width:'70%'}}>
                         <Image style={{width:200,height:190,alignSelf:'center',justifyContent:'center'}} source={{uri: moreData.restaurant_image}} />

                             </View>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Category</Text>
                         <Text style={{width:'70%'}}>Fresh Fruits</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>City</Text>
                         <Text style={{width:'70%'}}>Banglore</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Number</Text>
                         <Text style={{width:'70%'}}>8309677743</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Email</Text>
                         <Text style={{width:'70%'}}>{userData.email}</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>Address</Text>
                         <Text style={{width:'70%'}}>{moreData.restaurant_address}</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10}}>
                         <Text style={{width:'30%',fontWeight:'bold'}}>About us</Text>
                         <Text style={{width:'70%'}}>{moreData.description}</Text>
                    </View>           
                </ScrollView>

          )
        }}
      </Formik>
    );

  }
}


export default VendorDetailsScreen;

import { Formik } from 'formik';
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal'
import PhNumberInput from './PhNumberInput';
import { Input, Item, Card } from 'native-base';
// import Flag from 'react-native-flags';
import api from '../utils/vendorApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import SelectDropdown from 'react-native-select-dropdown'

const countries = ["Egypt", "Canada", "Australia", "Ireland"]


class VendorSubCategoryCreateScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName : '',
      mrp_price : '',
      selling_price : '',
      weight : '',
      imageUri: '',
      parent_id : '',
      loading : false,
      renderCategories : [],
      renderSubCategories: [],
      name : '',
      selectedCategory: ''
    }
  }

  componentDidMount = async () => {
   const data = await AsyncStorage.getItem('userData');
    const res = JSON.parse(data);
    this.setState({
      categoryName : '',
      mrp_price : '',
      selling_price : '',
      weight : '',
      imageUri: ''
    });
    this.checkRenderUpdate();
    this.renderCategories();
    this.renderSubCategories();
    

  }

  renderSubCategories = async () => {
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
        loading : true
    });
    try {
    const res = await api.get(`/categories`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });
    this.setState({
      renderCategories : res.data.message,
        loading: false 
    });

} catch(e){
    console.log(e);
}
this.setState({
    loading: false
});

  }


  renderCategories = async () => {
    const { params}  = this.props;

    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
        loading : true
    });
    try {
    const res = await api.get(`/category`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });
    res.data.categories.map((value, index) => {
        console.log(value);
        // alert(JSON.stringify(params.id));
        if(params!= undefined && value.parent_id == params.id) {
            // alert(JSON.stringify(value));
            this.setState({
                selectedCategory : value
            });
        }})
    this.setState({
      renderSubCategories : res.data.categories,
        loading: false 
    });

} catch(e){
    console.log(e);
}
this.setState({
    loading: false
});

  }

  checkRenderUpdate= () => {
    const { params, navigation} = this.props;

     if(params != undefined){
    this.setState({
      name : params.itemName,
      imageUri : params.image,
      parent_id : params.id
    });

    
    }
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

  createProduct = async(values) => {
    const { params, navigation} = this.props;
    this.setState({
      loading : true
    });
    if(params!= undefined) {
      const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');    
    console.log("product access token : "+retrieveAccessTocken);
    let body = new FormData();
    if(!values.imageUri.includes("http")){
    body.append('image', {uri: values.imageUri, name: 'photo.jpg', type: 'image/jpeg'});
    }
    body.append('parent_id', values.parent_id);
    body.append('name', values.name);
    body.append('status', 'Active');
    console.log(body);
    try {
    

      const res = await api.post(`/categoryUpdate/${params.id}`,body, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    },
      );

    this.setState({
      userData : res.data.user
    });
    this.setState({
      moreData : res.data.more
    });
    // alert('passed');
  } catch(e) {
    console.log(e);
    this.setState({
        loading: false
    })
    // alert(JSON.stringify(e));
    
  }
    

    } else {
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    console.log("product access token : "+retrieveAccessTocken);
    let body = new FormData();
    if(!values.imageUri.includes("http")){
      body.append('image', {uri: values.imageUri, name: 'photo.jpg', type: 'image/jpeg'});
    }
    body.append('parent_id', values.parent_id);
    body.append('name', values.name);
    body.append('status', 'Active');
    console.log(body);
    try {
        const res = await api.post(`/category`,body, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        },
          );

    this.setState({
      userData : res.data.user
    });
    this.setState({
      moreData : res.data.more
    });
    // alert('passed');
  } catch(e) {
      this.setState({
          loading: false
      })
    console.log(e);
    // alert(JSON.stringify(e));
  }
   
  }

  this.setState({
    loading : false
  })
  navigation.goBack();
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

  renderDropDown = (value, index) => {
    return (
      <View style={{padding:10}}>
        <Text>{value}</Text> 
        </View>
    )
  }


  render() {
    const { navigation , params} = this.props;
    const { modalVisible, categoryName, weight,imageUri,selling_price,mrp_price, loading, renderCategories, selectedCategory, parent_id, renderSubCategories,name } = this.state;

    var radio_props = [
        {label: 'Active    ', value: 0 },
        {label: 'Not Active', value: 1 }
      ];

    return (

        <Formik
        enableReinitialize
        initialValues={{
            parent_id : params!= undefined ? params.parent_id : '',imageUri : imageUri,name : name
        }}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            this.createProduct(values);
            formikActions.setSubmitting(false);
          }, 500);
        }}>
        {props => {
          const {
            setFieldValue, setValues
          } = props;

          const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            console.log(result);
            
            // if (!result.cancelled) {
              // this.setState({
                // loading : true
              // });
              // this.setState({
                // imageUri : result.uri
              // });
              setItemValue('imageUri',result.uri);   
              // this.setState({
                // loading : false
              // });           
          };
          
          const setItemValue = (name,value) => {
            setFieldValue(
              name, value)
          }

          return (

            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffe9c9', padding: 20}}>
              {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
              <View style={{backgroundColor: '#ffe9c9', flexDirection: 'row',marginBottom:30 }} >
                <View style={{ flex: 2, flexDirection: 'column',padding:10 }}>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:18,padding:5,textAlign:"center"}}>CREATE SUB CATEGORY SCREEN</Text>  
                </View>
                <View style={{flexDirection:'column'}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Select Category </Text>
          <Item>
<SelectDropdown
          defaultValue={renderCategories.find(val => {
            // alert(JSON.stringify(val));  
            if( params!= undefined && val.id == params.parent_id){
                return val;
              }})}
          buttonStyle={{width:'100%',borderRadius:15,backgroundColor:'white'}}
          dropdownStyle={{marginTop:-35}}
          renderCustomizedRowChild={this.renderDropDown}
	data={renderCategories}
	onSelect={(selectedItem, index) => {
        setItemValue('parent_id', selectedItem.id);
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.name;
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.name;
    
	}}
/>
          </Item>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Name </Text>
          <Item>
          <Input onChangeText={(value)=> {
            setItemValue('name',value);
          }} value={props.values.name} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </Item>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
          <Text  style={{fontWeight:'bold',fontSize:18,padding:5}}>Choose Image </Text>
          {props.values.imageUri != "" && <Image source={{uri: props.values.imageUri}} style={{width:200,height:200}} />}
          <TouchableOpacity onPress={pickImage} style={{padding:15,backgroundColor:'blue',width:'40%',borderRadius:15,marginTop:10}}>
              <Text style={{textAlign:'center',color:'white'}}>Choose File</Text>
              </TouchableOpacity>
              
          </View>
                  
                  <TouchableOpacity 
                  onPress={props.handleSubmit}
                   style={{ borderRadius: 15, width: '95%', backgroundColor: 'red', padding: 15, alignSelf: 'center',marginTop:40 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>{params!= undefined ? 'UPDATE' : 'CREATE'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

          )
        }}
      </Formik>
    );

  }
}


export default VendorSubCategoryCreateScreen;

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


class VendorProductCreateScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryName : '',
      mrp_price : '',
      selling_price : '',
      weight : '',
      imageUri: '',
      loading : false,
      renderCategories : [],
      renderSubCategories: [],
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
    const { params}  = this.props;
    if(params != undefined){
    this.setState({
      categoryName : params.itemName,
      mrp_price : params.mrp_price,
      selling_price: params.selling_price,
      weight: params.weight,
      imageUri : params.image
    })
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
    body.append('name', values.name);
    body.append('weight', values.weight);
    body.append('selling_price', values.selling_price);
    body.append('category_id', values.category_id);
    body.append('sub_category_id', values.sub_category_id);  
    body.append('mrp_price', values.mrp_price);
    const obj  =  {
    name : values.categoryName,
    mrp_price : values.mrp_price,
    imageUri: body,
    weight: values.weight,
    mrp_price: values.mrp_price,
    selling_price: values.selling_price,

    }
    console.log(body);
    try {
    const res = await api.post(`/updateItem/${params.id}`,body, {
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
  } catch(e) {
    console.log(e);
  }
    

    } else {
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    console.log("product access token : "+retrieveAccessTocken);
    let body = new FormData();
    if(!values.imageUri.includes("http")){
      body.append('image', {uri: values.imageUri, name: 'photo.jpg', type: 'image/jpeg'});
      }
    // body.append('image', {uri: values.imageUri, name: 'photo.jpg', type: 'image/jpeg'});
    body.append('name', values.name);
    body.append('weight', values.weight);
    body.append('selling_price', values.selling_price);
    body.append('category_id', values.category_id);
    body.append('sub_category_id', values.sub_category_id);

    body.append('mrp_price', values.mrp_price);
    console.log(body);
    try {
    const res = await api.post(`/addItem`,body, {
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
  } catch(e) {
    console.log(e);
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
    const { modalVisible, categoryName, weight,imageUri,selling_price,mrp_price, loading, renderCategories, renderSubCategories } = this.state;

    var radio_props = [
        {label: 'Active    ', value: 0 },
        {label: 'Not Active', value: 1 }
      ];

    return (

        <Formik
        enableReinitialize
        initialValues={{
          name : categoryName, category_id : params!= undefined ? params.category_id : '', sub_category_id : params!= undefined ? params.sub_category_id : '',imageUri : imageUri,weight : weight,mrp_price : mrp_price,selling_price :selling_price
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
              //   loading : true
              // });
              // this.setState({
              //   imageUri : result.uri
              // });
              setItemValue('imageUri',result.uri);   
              // this.setState({
              //   loading : false
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
                    <Text style={{fontWeight:'bold',fontSize:18,padding:5,textAlign:"center"}}>CREATE PRODUCT SCREEN</Text>  
                </View>

                <View style={{flexDirection:'column',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}> Name </Text>
          <Item>
          <Input  onChangeText={(value)=> {
            setItemValue('name',value);
          }} value={props.values.name} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </Item>
          </View>


                <View style={{flexDirection:'column'}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Select Category </Text>
          <Item>
          <SelectDropdown
          defaultValue={renderCategories.find(val => {
            // alert(JSON.stringify(val.id));
            if( params!= undefined && val.id == params.category_id){
                return val;
              }})}
          buttonStyle={{width:'100%',borderRadius:15,backgroundColor:'white'}}
          dropdownStyle={{marginTop:-35}}
          renderCustomizedRowChild={this.renderDropDown}
	data={renderCategories}
	onSelect={(selectedItem, index) => {
    setItemValue('category_id',selectedItem.id);
		console.log(selectedItem, index);
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
          <View style={{flexDirection:'column'}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Select Sub Category </Text>
          <Item>
          {/* <Input value={props.values.categoryName} onChangeText={(value)=> {
            setItemValue('categoryName',value);
          }} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} /> */}
          <SelectDropdown
                    defaultValue={renderSubCategories.find(val => {
                      if( params!= undefined && val.id == params.sub_category_id){
                          return val;
                        }})}
          buttonStyle={{width:'100%',borderRadius:15,backgroundColor:'white'}}
          dropdownStyle={{marginTop:-35}}
          renderCustomizedRowChild={this.renderDropDown}
	data={renderSubCategories}
	onSelect={(selectedItem, index) => {

    setItemValue('sub_category_id',selectedItem.id);

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
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>MRP Price </Text>
          <Item>
          <Input  onChangeText={(value)=> {
            setItemValue('mrp_price',value);
          }} value={props.values.mrp_price} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </Item>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Selling Price </Text>
          <Item>
          <Input onChangeText={(value)=> {
            setItemValue('selling_price',value);
          }} value={props.values.selling_price} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </Item>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5}}>Weight </Text>
          <Item>
          <Input onChangeText={(value)=> {
            setItemValue('weight',value);
          }} value={props.values.weight} style={{fontWeight:'bold',fontSize:18,padding:5,backgroundColor:'white',borderRadius:15}} />
          </Item>
          </View>
          <View style={{flexDirection:'column',marginTop:20}}>
          <Text  style={{fontWeight:'bold',fontSize:18,padding:5}}>Choose Image </Text>
          {props.values.imageUri != "" && <Image source={{uri: props.values.imageUri}} style={{width:200,height:200}} />}
          <TouchableOpacity onPress={pickImage} style={{padding:15,backgroundColor:'blue',width:'40%',borderRadius:15,marginTop:10}}>
              <Text style={{textAlign:'center',color:'white'}}>Choose File</Text>
              </TouchableOpacity>
              
          </View>
          {/* <View style={{flexDirection:'column'}}>
          <Text style={{fontWeight:'bold',fontSize:18,padding:5,marginTop:10}}>Status </Text>
          <View style={{marginTop:10}}>
          <RadioForm
  radio_props={radio_props}
  initial={0}
  value
  formHorizontal={true}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
  animation={true}
  onPress={(value) => {this.setState({value:value})}}
/>
</View>
        </View> */}
                  
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


export default VendorProductCreateScreen;

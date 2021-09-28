import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// const keyInput1 = React.createRef();

class FavScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.inputRef = React.createRef();
        this.state = {
          renderedData: [],
          loading: false,
          autoFocus : true
        }
      }



    componentDidMount() {
        const { navigation} = this.props;
        // this.refs.nameref.focus();
        this.renderSearchData();

        navigation.addListener('focus', () => {
            // Do whatever you want
            // alert('hello');
            // this.textInput.focus();
            // this.focus();
            // keyInput1.current.focus();
            // this.setState({
            // autoFocus : true
            this.renderSearchData();
        })
            // this.updateData();
            // this.updateCartCount();
        //   });
        
    }

    addToCart = async (value) => {
        const  { increment, counter, storeCount} = this.props;
        
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.post(`/addToCart`, {
                "product_id":value.product_id.id,
                "quantity": 1
        },{
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // increment();
        console.log(retrieveAccessTocken);
        storeCount(res.data.cart_counter);
        Toast.show({
            type: 'success',
            text1: 'item Added to Cart',
        });
    }

    renderSearchData = async () => {
       const  { renderedData} = this.state;
       this.setState({
           loading: true
       });
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        console.log(retrieveAccessTocken);
        const res = await api.get(`/favourites`,{
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // increment();
        // http://meatzone.seomantras.in/api/customer
        // alert(JSON.stringify(res.data));

        this.setState({
            renderedData : res.data.wishlist
        })
        this.setState({
            loading: false
        });
    }

    deleteAction = async(productId) => {
 
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading : true
        });
        try {
            const res = await api.delete(`/deleteFav/${productId}`,  {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        this.renderSearchData();
    } catch(e){
        console.log(e);
    }
    this.setState({
        loading: false
    });

 
    }


    render() {
        const { navigation } = this.props;
        const { loading, renderedData, autoFocus } = this.state;
        var s = [{ name: 'Chicken Meat 1' }, { name: 'Chicken Meat 2' }, { name: 'Chicken Meat 3' }, { name: 'Chicken Meat 4' }];
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
                <View style={{ padding: 5 }} />
              <View>
                        <View style={{ padding: 5 }} />
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', width: '100%', flexShrink: 1, flexWrap: 'wrap' }} >
                            {renderedData.map((value, index) => {
                                return (
                                    <Card style={{ padding: 0, width: '95%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', borderRadius: 15 }}>
                                        <View style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 0 }}>
                                            <View style={{ flexDirection: 'column', width: '100%' }} >
                                                <Image source={{uri: value.product_id.image}} style={{ height: 150, width: 350, alignSelf: 'center', borderRadius: 15 }} />
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',marginTop:10 }}>
                                                    <Text style={{ width: '85%', padding: 5, fontSize: 20 }}>
                                                        {value.product_id.name}
                                                    </Text>
                                                    <View>
                                                    <MaterialCommunityIcons 
                                         style={{justifyContent:'center'}}
                                    onPress={()=>this.deleteAction(value.id)} 
                                    name="delete" size={30} color={"red"}/>
                                                    </View>
                                                </View>
                                                {/* <View style={{ flexDirection: 'column', padding: 5 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 5 }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Ionicons name="location" size={10} style={{ textAlign: 'center', alignSelf: 'center' }} />
                                                            <Text style={{ color: 'grey' }}>  2.8 KM </Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                                            <Ionicons name="time" size={10} style={{ textAlign: 'center', alignSelf: 'center' }} />
                                                            <Text style={{ color: 'grey' }}>  20-34 min</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                                            <Ionicons name="star-outline" size={10} style={{ textAlign: 'center', alignSelf: 'center' }} />
                                                            <Text style={{ color: 'grey' }}>  4.8</Text>
                                                        </View>
                                                    </View>
                                                </View> */}
                                                <Item />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15 }}>
                                            <View>
                                                <Text>{value.product_id.mrp_price} Rs</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=> this.addToCart(value)} style={{
                                                width: 22,
                                                height: 22,
                                                borderWidth: 2,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 0,
                                                borderRadius: 20,
                                                backgroundColor: 'green'
                                            }}>
                                                <Text style={{ padding: 2, color: 'white' }}> + </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                )
                            })}
                        </ScrollView>
                    </View>
            </ScrollView>
        );
    }
}




export default FavScreen;

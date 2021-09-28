import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator,TextInput } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const keyInput1 = React.createRef();

class ShopScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.russian = React.createRef();
        this.state = {
          renderedData: [],
          
          loading: false,
          autoFocus : true
        }
      }



    componentDidMount() {
        const { navigation} = this.props;
        // this.refs.nameref.focus();

        navigation.addListener('focus', () => {
            // Do whatever you want
            // alert('hello');
            // this.textInput.focus();
            // this.focus();
            // keyInput1.current.focus();
            this.setState({
            autoFocus : true
        })
        setTimeout(() => {
            // console.log(this.russian); 
            // if(this.russian.current.focus()!= null){ 
            // this.russian.current.focus();
            // }
            // console.log(this.russian);
        }, 2000);
            // this.updateData();
            // this.updateCartCount();
          });
        
    }

    addToCart = async (value) => {
        const  { increment, counter, storeCount} = this.props;
        
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.post(`/addToCart`, {
                "product_id":value.id,
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

    renderSearchData = async (value) => {
       const  { renderedData} = this.state;
       this.setState({
           loading: true
       });
       try {
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.get(`/search/${value}`,{
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // increment();
        // http://meatzone.seomantras.in/api/customer
        // alert(JSON.stringify(res.data.items));
        this.setState({
            renderedData : res.data.items
        })
        this.setState({
            loading: false
        });
    } catch (e) {
        this.setState({
            renderedData : []
        });
        this.setState({
            loading: false
        });
    }
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
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Feather name="search" size={25} style={{ marginLeft: 5 }} />
                    <Input
                    // ref = {}
                    name="russian"
                    // ref={this.russian}
    //   ref={ (input) => { this.focus = input }}
      //   ref={ref => ref && this.setState({ref})}
                        onChangeText={(val)=> this.renderSearchData(val)}
                        autoFocus={true}
                        focusable={true}
                        // maxLength={10}
                        placeholder={'Search for Item'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black',padding:10 }}
                    />
                </Item>
              <View>
                        <View style={{ padding: 5 }} />
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', width: '100%', flexShrink: 1, flexWrap: 'wrap' }} >
                            {renderedData.map((value, index) => {
                                return (
                                    <Card style={{ padding: 0, width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', borderRadius: 15 }}>
                                        <View style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 0 }}>
                                            <View style={{ flexDirection: 'column', width: '100%' }} >
                                                <Image source={{uri: value.image}} style={{ height: 150, width: 350, alignSelf: 'center', borderRadius: 15 }} />
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ width: '85%', padding: 5, fontSize: 20 }}>
                                                        {value.name}
                                                    </Text>

                                                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 2, padding: 5 }}>
                                                        <Entypo name="heart-outlined" color="red" size={20} />

                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'column', padding: 5 }}>
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
                                                </View>
                                                <Item />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15 }}>
                                            <View>
                                                <Text>{value.mrp_price} Rs</Text>
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




export default ShopScreen;

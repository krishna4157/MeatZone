import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image,TextInput } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Button, Input, Item } from 'native-base';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

class CartScreen extends React.Component {
    state = {
        renderData : ''
    };



    componentDidMount = async () => {
        // const res = await api.get('/categories');
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        // alert(retrieveAccessTocken);
        this.setState({
            loading : true
        });
        const res = await api.get(`/viewCart`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        alert(JSON.stringify(res.data));
        this.setState({
            renderData : res.data.carts,
            loading: false 
        })
        // alert(JSON.stringify(res.data));
        // this.setState({
        //     renderData : res.data.message 
        // })
      }


    render() {
        const { navigation } = this.props;
        var s = [1, 2, 3, 4, 5];
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 5.5 }}>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 ,marginBottom:20}}>
                        { this.state.renderData!='' && 
                        this.state.renderData.map((value, index) => {
                            return (<View>
                                <View style={{ flexDirection: 'row', padding: 20 }}>
                                    <Image source={{ uri : value.product_id.image}} style={{ height: 100, width: 100 }} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chicken Meat</Text>
                                        <Text>{JSON.stringify(value.product_id.image)}</Text>
                                    </View>
                                </View>
                                <View style={{padding:10,flexDirection:'row'}}>
                                    <View style={{flex:3,justifyContent:'center'}}>
                                    <Text style={{textAlign:'left'}} >{value.name}</Text>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row',backgroundColor:'green',justifyContent:'space-evenly',alignSelf:'center',borderRadius:5}}>
                                        <TouchableOpacity style={{padding:5,borderRightWidth:0}}>
                                           <Text style={{textAlign:'center',alignSelf:'center',color:'white'}}> -</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{padding:5,backgroundColor:'white'}}>
                                           <Text style={{textAlign:'center',alignSelf:'center'}}>{value.quantity}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{padding:5,borderLeftWidth:0}}>
                                           <Text style={{textAlign:'center',alignSelf:'center',color:'white'}}>+</Text>
                                        </TouchableOpacity>
                                        </View>
                                        <View style={{flex:2,flexDirection:'row',justifyContent:'flex-end'}}>
                                        <Text style={{textAlign:'center',alignSelf:'center'}}>{value.product_id.mrp_price*value.quantity} Rs</Text>
                                        </View>
                                </View>
                                <View style={{height:200}}>
                                    <Item style={{marginTop:20}} />
                                    <TextInput
                                     multiline={true}
                                autoFocus={true}
                                placeholder={'Any Instruction we promise you to pass them'}
                                // keyboardType="number-pad"
                                placeholderTextColor='#bdbdbd'
                                style={{ color: 'red',height:100,width:'100%' }}
                            />
                                    </View>
                                    </View>)
                        })
                        }
                            <View>
                                <Text>Restuarant bill</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                                    <Text>Item Total</Text>
                                    <Text>150 Rs</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                                    <Text>GST</Text>
                                    <Text>150 Rs</Text>
                                </View>
                                <Item />
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                                    <Text>Delivery charges</Text>
                                    <Text>150 Rs</Text>
                                </View>
                                <Item />
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
                                    <Text style={{fontWeight:'bold'}}>To Pay</Text>
                                    <Text>150 Rs</Text>
                                </View>
                            </View>
                    </ScrollView>
                </View>
                <View style={{flex:0.5,padding:20,backgroundColor:'grey'}}>
                <Button full style={{borderRadius:15,backgroundColor:'red'}}>
                    <Text style={{fontWeight:'bold',color:'white'}}>PLACE ORDER</Text>
                        </Button>
                    </View>
            </View>
        );
    }
}




export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    image: {
        width: 180,
        resizeMode: 'contain'
    },
    logo: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})

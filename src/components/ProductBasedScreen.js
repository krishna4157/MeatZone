import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { increment } from '../actions/counter';

class ProductBasedScreen extends React.Component {
    state = {
        renderData : '',
        favItems: []
    };


    markAsFav= async (id,index) => {
        const  { favItems} = this.state;
        var s = favItems; 
        s.push(index);
        this.setState({
            favItems : s
        })
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.post(`/addFav`, {
            "food_id":id   
        },{
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });

    }

    addToCart = async (value) => {
        const  { favItems} = this.state;
        const  { increment} = this.props;
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
        alert(JSON.stringify(res.data));
        increment();

    }



    componentDidMount = async () => {
        const {navigation, route} = this.props;
        const id = route.params.id;

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.get(`/itemsByCategory/${id}`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // alert(JSON.stringify(res.data));
        this.setState({
            renderData : res.data.items 
        })
      }

    render() {
        const { navigation, route, increment } = this.props;
        const s = [
            {
                key: 1,
                width : 80,
                title: 'Chicken',
            },
            {
                key: 2,
                width : 80,
                title: 'Mutton',
            },
            {
                key: 3,
                width : 80,
                title: 'Fish',
            },
            {
                key: 4,
                width : 80,
                title: 'Ready to Cook',
            },
            {
                key: 5,
                width : 80,
                title: 'Egg',
            },
            {
                key: 6,
                width : 80,
                title: 'Other',
            },
        ];
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                <Text style={{textAlign:'center',fontSize:25}}>{route.params.itemName}</Text>
                <View style={{ padding: 5 }} />
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Input

                        autoFocus={true}
                        maxLength={10}
                        placeholder={' Search'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black',marginLeft:10 }}
                    />
                                        <Feather name="search" size={25} style={{ marginRight: 15 }} />

                </Item>
                <Card style={{padding:10,borderRadius:15}}>
                    <View style={{flexDirection:'column'}}>
                    <Text>Meat & Eat</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name="location" size={10} style={{textAlign:'center',alignSelf:'center'}} />
                    <Text style={{color:'grey'}}>  2.8 KM </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name="time" size={10} style={{textAlign:'center',alignSelf:'center'}} />
                    <Text style={{color:'grey'}}>  20-34 min</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name="star-outline" size={10} style={{textAlign:'center',alignSelf:'center'}} />
                    <Text style={{color:'grey'}}>  4.8</Text>
                    </View>
                    </View>
                    </View>
                    </Card>
                    <View>
                        <View style={{ padding: 5 }} />
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', width: '100%', flexShrink: 1, flexWrap: 'wrap' }} >
                            {this.state.renderData != '' && this.state.renderData.map((value, index) => {
                                return (
                                    <View style={{padding: 5, width: '50%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',flexDirection:'column' }}>
                                        <Card style={{flexWrap: 'wrap',justifyContent:'center',borderRadius:15,padding:5 }}>
                                            <View style={{flexDirection:'column',width:'100%'}} >
                                            <Image source={{uri : value.image}} style={{ height: 150, width: 150,alignSelf:'center',borderRadius:15 }} />
                                            <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{width:'80%',padding:5}}>
                                                {value.name}
                                                    </Text>
                                                <TouchableOpacity onPress={()=> this.markAsFav(value.id,index)} style={{alignSelf:'center',marginLeft:2,padding:5}}>
                                                {this.state.favItems.includes(index) ? <Entypo name="heart" color="red" size={20} /> : <Entypo name="heart-outlined" color="red" size={20} />}
                                                </TouchableOpacity>
                                                </View>
                                                </View>
                                        </Card>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',padding:5}}>
                                            <View>
                                            <Text>{value.mrp_price} Rs</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=> this.addToCart(value)} style={{width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 20,
    backgroundColor: 'green',
    borderWidth:3
    }}>
                                                <Text style={{padding:2,color:'white'}}> + </Text>
                                            </TouchableOpacity>
                                        </View>
                                     </View>
                                    )
                            })}
                        </ScrollView>
                    </View>
            </ScrollView>
        );
    }
}




export default ProductBasedScreen;

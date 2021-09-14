import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { EvilIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProductOnFocusScreen extends React.Component {
    state = {
        renderData : '',
        loading: false
    };



    componentDidMount = async () => {
        // const res = await api.get('/categories');
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        // alert(retrieveAccessTocken);
        this.setState({
            loading : true
        });
        const res = await api.get(`/categories`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // alert(JSON.stringify(res.data));
        this.setState({
            renderData : res.data.message,
            loading: false 
        })
        // alert(JSON.stringify(res.data));
        // this.setState({
        //     renderData : res.data.message 
        // })
      }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;
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
                <View style={{ padding: 5 }} />
                <Card style={{padding:10,borderRadius:20}}>
                    <View style={{flex:1,flexDirection:'row',padding:10}}>
                        <View style={{flex:1.5}}>
                        <Image style={{width:70,height:70,alignSelf:'center',justifyContent:'center',borderRadius:50}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
                        </View>
                        <View style={{flex:4.5,flexDirection:'column',marginLeft:10,justifyContent:'center'}}>
                            <Text>Chicken Meat Shop</Text>
                            <Text>2.8 Km</Text>
                            <Text>20 - 34 min</Text>
                        </View>
                    </View>
                    </Card>
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Input

                        autoFocus={true}
                        maxLength={10}
                        placeholder={'Search'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                                        <Feather name="search" size={25} style={{ marginRight: 10 }} />

                </Item>
                    <View>
                    <Text style={{padding:15,fontSize:22}}>Catergories</Text>
                    {loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
                        <View style={{ padding: 5 }} />
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', width: '100%', flexShrink: 1, flexWrap: 'wrap' }} >
                            {this.state.renderData != '' && this.state.renderData.map((value,index) => {
                                return (
                                    <View style={{padding: 5, width: '33.33%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',flexDirection:'column' }}>
                                        <Card style={{flexWrap: 'wrap',justifyContent:'center',borderRadius:5,padding:0 }}>
                                            <TouchableOpacity onPress={()=>navigation.navigate('ProductBasedPage',{ 'id' : value.id, 'itemName' : value.name })} style={{flexDirection:'column',width:'100%'}} >
                                            <Image source={{uri : value.image}} style={{ height: 50, width:70,alignSelf:'center',marginTop:10 }} />
                                            <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{width:'100%',padding:5,textAlign:'center'}}>
                                                {value.name}
                                                    </Text>
                                                </View>
                                                </TouchableOpacity>
                                        </Card>                                       
                                     </View>
                                    )
                            })}
                        </ScrollView>
                    </View>
                    {/* ) */}
                {/* })} */}
            </ScrollView>
        );
    }
}




export default ProductOnFocusScreen;

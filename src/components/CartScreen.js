import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, TextInput, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Button, Input, Item } from 'native-base';
import { EvilIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import Toast from 'react-native-toast-message';
import { stringify } from 'flatted';
import PaymentPage from '../containers/PaymentPage';

class CartScreen extends React.Component {
    state = {
        renderData: '',
        totalPrice: 0,
        loading: false,
        showPaymentPage: false,
        zIndexOfPayment: 0,
        webKey : 0
    };


    updateCartCount = async () => {
        const { favItems } = this.state;
        const { increment, counter, storeCount } = this.props;

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.get(`/viewCartCount`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
            },
        });
        // increment();
        storeCount(res.data.count);
    }



    componentDidMount = async () => {
        const { navigation } = this.props;
        const profileData = await AsyncStorage.getItem("userDetails");
        // this.setState({
        //     renderData : res.data.message 
        // })
        this.updateData();
        this.updateCartCount();

        const unsubscribe = navigation.addListener('focus', () => {
            // Do whatever you want
            Toast.show({
                type: 'success',
                text1: 'Refreshing Cart Success',
                // text2: 'This is some something 👋'
            });
            this.updateData();
            this.updateCartCount();
        });
    }

    updateData = async () => {
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading: true
        });
        try {
            const res = await api.get(`/viewCart`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });
            this.setState({
                renderData: res.data.carts,
                loading: false
            });

            var totalCartArray = [];
            res.data.carts.map((value, index) => {
                totalCartArray.push(value.product_id.mrp_price * value.quantity);
            });

            var sum = totalCartArray.reduce(function (a, b) {
                return a + b;
            }, 0);
            this.setState({
                totalPrice: sum
            });
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        });

    }


    addItem = async (productId, quantity) => {

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading: true
        });
        try {
            const res = await api.post(`/modifyCart/${productId}`,
                {
                    "quantity": quantity + 1
                }
                , {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Authorization": `Bearer ${retrieveAccessTocken}`,
                    },
                });
            this.updateData();
            this.updateCartCount();
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        });


    }

    placeOrderAction = async () => {

        const { totalPrice } = this.state;
        const profileData = await AsyncStorage.getItem("userDetails");
        const data = {
            "payment_id": "dvdgfg",
            "payment_type": "Online",
            "payable_price": totalPrice + 300,
            "shipping_pincode": "37001",
            "shipping_address": "Bhuj",
            "order_note": "abcde",
            "vendor_id": 3
        }


        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading: true
        });
        try {
            const res = await api.post(`/placeOrder`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });
            const stringifyOrder = JSON.stringify(res.data);
            await AsyncStorage.setItem('order', stringifyOrder);
            Toast.show({
                type: 'success',
                text1: 'Order Placed Succesfully',
                // text2: 'This is some something 👋'
            });
            this.updateData();
            this.updateCartCount();
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        });


    }

    updateKey = () => {
        this.setState({
            webKey :this.state.webKey+1
        })
    }

    deleteAction = async (productId) => {

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading: true
        });
        try {
            const res = await api.delete(`/deleteCart/${productId}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });
            this.updateData();
            this.updateCartCount();

        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        });


    }

    removeItem = async (productId, quantity) => {
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading: true
        });
        try {
            if (quantity > 0) {
                const res = await api.post(`/modifyCart/${productId}`,
                    {
                        "quantity": quantity - 1
                    }
                    , {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": `Bearer ${retrieveAccessTocken}`,
                        },
                    });
                this.updateData();
                this.updateCartCount();
            }
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        });

    }


    render() {
        const { navigation } = this.props;
        const { totalPrice, loading, showPaymentPage, zIndexOfPayment } = this.state;

        var s = [1, 2, 3, 4, 5];
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', zIndex: 10 - zIndexOfPayment, position: 'absolute', backgroundColor: 'white', height: '100%', width: '100%' }}>
                    {loading && <View style={{ position: 'absolute', zIndex: 1, height: '100%', width: '100%', justifyContent: 'center' }}>

                        <ActivityIndicator size="large" color="red" />
                    </View>}
                    <View style={{ flex: 5.5 }}>
                        <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10, marginBottom: 20 }}>
                            {this.state.renderData != '' ?
                                this.state.renderData.map((value, index) => {
                                    return (<View>
                                        <View style={{ flexDirection: 'row', padding: 20 }}>
                                            <Image source={{ uri: value.product_id.image }} style={{ height: 100, width: 100,borderRadius:15 }} />
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                                <View style={{ flexDirection: 'row' }} >
                                                    <View style={{flexDirection:'column', width:'70%'}}>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{value.product_id.name}</Text>
                                                    <Text style={{ fontSize: 15,marginTop:10}}>{value.product_id.mrp_price * value.quantity} Rs</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                                        <MaterialCommunityIcons
                                                            style={{ justifyContent: 'center' }}
                                                            onPress={() => this.deleteAction(value.id)}
                                                            name="delete" size={30} color={"red"} />
                                                    </View>
                                                </View>
                                                {/* <Text>{JSON.stringify(value.product_id)}</Text> */}
                                            </View>
                                            <View>

                                            </View>

                                        </View>
                                        <View style={{ padding: 10, flexDirection: 'row' }}>
                                            <View style={{ flex: 3, justifyContent: 'center' }}>
                                                <Text style={{ textAlign: 'left' }} >{value.name}</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', justifyContent: 'space-evenly', alignSelf: 'center', borderRadius: 5 }}>
                                                <TouchableOpacity onPress={() => {
                                                    if(value.quantity > 1) {
                                                        this.removeItem(value.id, value.quantity)
                                                    }}} style={{ padding: 5, borderRightWidth: 0 }}>
                                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: 'white' }}> -</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={1} style={{ padding: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ textAlign: 'center', alignSelf: 'center' }}>{value.quantity}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.addItem(value.id, value.quantity)} style={{ padding: 5, borderLeftWidth: 0 }}>
                                                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: 'white' }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>)
                                }) :
                                <View>
                                    <Image style={{ width: 250, height: 190, alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 300 }} source={require('../assets/images/cart.png')} />
                                    <Text style={{ textAlign: 'center', padding: 10, fontSize: 25 }}>Your cart is Empty !</Text>
                                </View>
                            }
                            {this.state.renderData != '' && <View>
                            <View style={{ marginTop: 20,height: 200,borderWidth:2,borderColor:'grey',borderRadius:15 }}>
                                            <Item />
                                            <TextInput
                                                multiline={true}
                                                autoFocus={true}
                                                placeholder={'Any Instruction we promise you to pass them'}
                                                placeholderTextColor='#bdbdbd'
                                                style={{ color: 'black', height: 100, width: '95%',marginTop:-20,marginLeft:10,marginRight:25,padding:5 }}
                                            />
                                </View >
                                <Text style={{fontWeight:'bold',padding:10,fontSize:20}}>Restuarant bill</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                    <Text>Items Total</Text>
                                    <Text>{totalPrice} Rs</Text>
                                </View>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                    <Text>GST</Text>
                                    <Text>{totalPrice*0.18} Rs</Text>
                                </View> */}
                                <Item />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                    <Text>Delivery charges</Text>
                                    <Text>20 Rs</Text>
                                </View>
                                <Item />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold' }}>To Pay</Text>
                                    <Text>{totalPrice + 20} Rs</Text>
                                </View>
                            </View>}
                        </ScrollView>
                    </View>
                    {this.state.renderData !='' && <View style={{ flex: 0.5, padding: 20 }}>
                        <Button
                            onPress={() => {
                                this.updateKey();
                                navigation.navigate('PaymentPage', { parsedData: this.state.renderData, totalPrice, uri: 'https://kittu7878545423.000webhostapp.com/index.php', 'placeOrderAction' : this.placeOrderAction, 'updateWebViewKey' : this.updateKey, 'webKey': this.state.webKey })}
                            }
                            full style={{ borderRadius: 15, backgroundColor: this.state.renderData != '' ? 'red' : 'grey' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>PLACE ORDER</Text>
                        </Button>
                    </View>}

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

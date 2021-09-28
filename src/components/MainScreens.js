import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, BackHandler } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

var slides = [
    {
        key: 1,
        width: 80,
        title: 'The Best for Meat',
        text: 'Description.\nSay something cool',
        image: require('../assets/images/chicken.jpeg'),
        backgroundColor: 'white',
        names: [
            {
                companyName: 'chicken',
                image: require('../assets/images/chicken.jpeg'),
                height: 80,
                width: 80

            }, {
                companyName: 'Fish',
                image: { uri: 'http://meatzone.seomantras.in/public/uploads/images/612dcceb83ad3.jpg' },
                height: 80,
                width: 80
            },]
    },
    // {
    //     key: 2,
    //     width : 90,
    //     title: 'Popular Brands',
    //     text: 'Other cool stuff',
    //     image: require('../assets/images/acslogo.png'),
    //     backgroundColor: '#febe29',
    //     names: [{
    //         companyName: 'Meat and Eat',
    //         image: require('../assets/images/chicken.jpeg'),
    //         width: 90,
    //         height: 90
    //     }, {
    //         companyName: 'Comming Soon',
    //         image: require('../assets/images/chicken.jpeg'),
    //         height:90,
    //         width:90
    //     },
    //     {
    //         companyName: 'Comming Soon',
    //         image: require('../assets/images/chicken.jpeg'),
    //         width: 90,
    //         height:90

    //     },
    //     {
    //         companyName: 'Comming Soon',
    //         image: require('../assets/images/chicken.jpeg'),
    //         width: 90,
    //         height:90
    //     },
    //     ]
    // },
    {
        key: 2,
        width: 180,
        title: 'All Restaurants',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../assets/images/acslogo.png'),
        backgroundColor: '#22bcb5',
        names: [{
            companyName: 'Meat 1 Shop',
            image: require('../assets/images/chicken.jpeg'),
            width: 180,
            height: 100


        }, {
            companyName: 'Meat 2 Shop',
            image: require('../assets/images/chicken.jpeg'),
            width: 180,
            height: 100

        }, {
            companyName: 'Meat 3 Shop',
            image: require('../assets/images/chicken.jpeg'),
            width: 180,
            height: 100

        }, {
            companyName: 'Meat 4 Shop',
            image: require('../assets/images/chicken.jpeg'),
            width: 180,
            height: 100

        }]
    }
];

class MainScreen extends React.Component {
    state = {
        loading: true,
        renderCategories: "",
        renderRestaurants : "",
    };


    componentDidMount = async () => {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const { navigation} = this.props;
        this.setCategories();
              this.setCount();
              this.getRestaurnts();
        const unsubscribe = navigation.addListener('focus', () => {
            // Do whatever you want
              this.setCategories();
              this.setCount();
              this.getRestaurnts();
                      });
        
    }

    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    setCategories = async () => {
        const { counter, storeCount } = this.props;
        const { loading } = this.state;

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        try {
            this.setState({
                loading: true
            });
            const res1 = await api.get(`/categories`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });

            this.setState({
                renderCategories: res1.data.message
            });

        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        })

    }

    getRestaurnts = async () => {
        const { counter, storeCount } = this.props;
        const { loading } = this.state;

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        try {
            this.setState({
                loading: true
            });
            const res1 = await api.get(`/allRestaurants`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });

            this.setState({
                renderRestaurants: res1.data.restaurants
            });

        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        })

    }

    setCount = async () => {
        const { counter, storeCount } = this.props;
        const { loading } = this.state;

        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        try {
            this.setState({
                loading: true
            });
            const res1 = await api.get(`/viewCartCount`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": `Bearer ${retrieveAccessTocken}`,
                },
            });

            this.setState({
                itemsInCart: res1.data.count
            });
            storeCount(res1.data.count);
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false
        })
    }

    render() {
        const { navigation } = this.props;
        const { loading, renderCategories,renderRestaurants } = this.state;

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                {/* <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <EvilIcons name="location" size={30} />
                    <Input
                        // autoFocus={true}
                        maxLength={10}
                        placeholder={'location'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                </Item> */}
                <View style={{ padding: 5 }} />
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Feather name="search" size={25} style={{ marginLeft: 5 }} />
                    <Input
                        onFocus={()=> navigation.navigate('ItemSearchPage')}
                        // autoFocus={true}
                        maxLength={10}
                        placeholder={'Search'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                </Item>
                <View>
                    <View style={{ padding: 5 }} >
                    
                    <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 25 }}>The Best For Meat</Text>
  
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                        {renderCategories.length!= 0 ? renderCategories.map((val, index) => {
                            return (

                                <TouchableOpacity onPress={() =>
                                    // navigation.navigate('ProductOnFocusPage')
                                    navigation.navigate('ProductBasedPage', { 'id': val.id, 'itemName': val.name, screen :'fromHomePage' })
                                }
                                    style={{ padding: 5, width: 80 + 50, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <Card style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 5 }}>
                                        <View style={{ flexDirection: 'column', width: '100%' }} >
                                            <Image source={{ uri: val.image }} style={{ height: 80, width: 80, alignSelf: 'center', borderRadius: 10 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ width: '80%', padding: 5, textAlign: 'center' }}>
                                                    {val.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>);
                        }) :
                        <View >
                        <ActivityIndicator style={{alignSelf:'center',alignItems:'center',justifyContent:'center',alignContent:'center'}} size="large" color="red" />
                        </View>}
                        </ScrollView>
                        </View>


                        <View style={{ padding: 5 }} >
                    
                    <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 25 }}>All Restaurants</Text>
  
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                        {renderRestaurants.length!= 0 ? renderRestaurants.map((val, index) => {
                            return (

                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('ProductOnFocusPage',{ 'id': val.id, 'itemName': val.name })
                                    // navigation.navigate('ProductBasedPage', { 'id': val.id, 'itemName': val.name })
                                }
                                    style={{ padding: 5, width: 180 + 50, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <Card style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 5 }}>
                                        <View style={{ flexDirection: 'column', width: '100%' }} >
                                            <Image source={{ uri: val.restaurant_image }} style={{ height: 100, width: 180, alignSelf: 'center', borderRadius: 10 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ width: '80%', padding: 5, textAlign: 'center' }}>
                                                    {val.restaurant_name}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>);
                        }) :
                        <View >
                        <ActivityIndicator style={{alignSelf:'center',alignItems:'center',justifyContent:'center',alignContent:'center'}} size="large" color="red" />
                        </View>}
                        </ScrollView>
                        </View>



                </View>



                
                
            </ScrollView>
        );
    }
}




export default MainScreen;

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

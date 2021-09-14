import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MainScreen extends React.Component {
    state = {

    };



    async componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        const slides = [
            {
                key: 1,
                width : 80,
                title: 'The Best for Meat',
                text: 'Description.\nSay something cool',
                image: require('../assets/images/chicken.jpeg'),
                backgroundColor: 'white',
                names: [{
                    companyName: 'chicken',
                    image: require('../assets/images/chicken.jpeg'),
                    height : 80,
                    width : 80

                }, {
                    companyName: 'Fish',
                    image: { uri: 'http://meatzone.seomantras.in/public/uploads/images/612dcceb83ad3.jpg' },
                    height: 80,
                    width : 80
                },]
            },
            {
                key: 2,
                width : 90,
                title: 'Popular Brands',
                text: 'Other cool stuff',
                image: require('../assets/images/acslogo.png'),
                backgroundColor: '#febe29',
                names: [{
                    companyName: 'Meat and Eat',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 90,
                    height: 90
                }, {
                    companyName: 'Comming Soon',
                    image: require('../assets/images/chicken.jpeg'),
                    height:90,
                    width:90
                },
                {
                    companyName: 'Comming Soon',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 90,
                    height:90

                },
                {
                    companyName: 'Comming Soon',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 90,
                    height:90
                },
                ]
            },
            {
                key: 3,
                width : 180,
                title: 'Meat Stores Near you',
                text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
                image: require('../assets/images/acslogo.png'),
                backgroundColor: '#22bcb5',
                names: [{
                    companyName: 'Meat 1 Shop',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 180,
                    height:100


                }, {
                    companyName: 'Meat 2 Shop',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 180,
                    height:100

                }, {
                    companyName: 'Meat 3 Shop',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 180,
                    height:100

                }, {
                    companyName: 'Meat 4 Shop',
                    image: require('../assets/images/chicken.jpeg'),
                    width: 180,
                    height:100

                }]
            }
        ];
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>

                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <EvilIcons name="location" size={30} />
                    <Input
                        autoFocus={true}
                        maxLength={10}
                        placeholder={'location'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                </Item>
                <View style={{ padding: 5 }} />
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Feather name="search" size={25} style={{ marginLeft: 5 }} />
                    <Input

                        autoFocus={true}
                        maxLength={10}
                        placeholder={'Search'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                </Item>
                {slides.map((value, index) => {
                    return (<View>
                        <View style={{ padding: 5 }} />
                        <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 25 }}>{value.title}</Text>
                        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                            {value.names.map((val, index) => {
                                return (
                                    
                                    <TouchableOpacity onPress={()=> navigation.navigate('ProductOnFocusPage')} style={{ padding: 5, width: value.width+50, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
                                        <Card style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 5 }}>
                                            <View style={{ flexDirection: 'column', width: '100%' }} >
                                                <Image source={val.image} style={{ height: val.height, width: val.width, alignSelf: 'center', borderRadius: 10 }} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ width: '80%', padding: 5,textAlign:'center' }}>
                                                        {val.companyName}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>);
                            })}
                        </ScrollView>
                    </View>)
                })}
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

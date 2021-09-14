import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Card, Input, Item } from 'native-base';
import { Entypo, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ShopScreen extends React.Component {
    state = {

    };



    async componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        var s = [{ name: 'Chicken Meat 1' }, { name: 'Chicken Meat 2' }, { name: 'Chicken Meat 3' }, { name: 'Chicken Meat 4' }];
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                <View style={{ padding: 5 }} />
                <Item style={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 20 }}>
                    <Feather name="search" size={25} style={{ marginLeft: 5 }} />
                    <Input

                        autoFocus={true}
                        maxLength={10}
                        placeholder={'Search for Item'}
                        // keyboardType="number-pad"
                        placeholderTextColor='#bdbdbd'
                        style={{ color: 'black' }}
                    />
                </Item>
                {s.map(() => {
                    return (<View>
                        <View style={{ padding: 5 }} />
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', width: '100%', flexShrink: 1, flexWrap: 'wrap' }} >
                            {s.map((value, index) => {
                                return (
                                    <Card style={{ padding: 0, width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', borderRadius: 15 }}>
                                        <View style={{ flexWrap: 'wrap', justifyContent: 'center', borderRadius: 15, padding: 0 }}>
                                            <View style={{ flexDirection: 'column', width: '100%' }} >
                                                <Image source={require('../assets/images/chicken.jpeg')} style={{ height: 150, width: 350, alignSelf: 'center', borderRadius: 15 }} />
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
                                                <Text>120 Rs</Text>
                                            </View>
                                            <TouchableOpacity style={{
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
                    </View>)
                })}
            </ScrollView>
        );
    }
}




export default ShopScreen;

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image,TextInput } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import { Input, Item } from 'native-base';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

class FAQScreen extends React.Component {
    state = {
        renderData : ''
    };



    componentDidMount = async () => {
        const {navigation} = this.props;
        // const id = route.params.id;
        const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        const res = await api.get(`/faqs`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        this.setState({
            renderData : res.data.faq 
        })
    }

    render() {
        const { navigation } = this.props;
        var s = [1, 2, 3, 4, 5];
        return (
            <View style={{ flex: 1, flexDirection: 'column',padding:20,backgroundColor: '#ffe9c9' }}>
              <Image style={{width:100,height:100,alignSelf:'center',justifyContent:'center',borderRadius:50}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
                    <Text style={{fontWeight:'bold',fontSize:22}}>FAQ</Text>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                        {this.state.renderData!='' && this.state.renderData.map((value, index) => {
                        return (
                        <View style={{flexDirection:'column',padding:10}}>
                            <View style={{flexDirection:'row',padding:5}}>
                            <Text style={{fontWeight:'bold'}}>Q {index+1}. </Text><Text style={{fontWeight:'bold'}}>{value.question}</Text>
                            </View>
                        <Text style={{padding:15}}>{value.answer}</Text>
                        </View>)})}  
                    </ScrollView>
            </View>
        );
    }
}




export default FAQScreen;

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

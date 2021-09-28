import { values } from 'lodash-es';
import React, { useState, useEffect, useRef } from 'react'
// import { StyleSheet, View, Text, TouchableOpacity, Platform, BackHandler } from 'react-native'
// import PaymentScreen, { PaymentView } from '../components/PaymentScreen'
// import axios  from 'axios';
// import PayUMoney,{HashGenerator} from 'react-native-payumoney';
// // import PayumoneyGetway from 'react-native-payumoney-getway';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PayumoneyGetway from 'react-native-payumoney-getway';
// import WebView from 'react-native-webview';
// import PayUMoneyScreen from '../components/PayUMoney';
// import { sha512 } from 'react-native-sha512';
// const webViewRef = React.createRef();

import { Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';

// var WEBVIEW_REF = React.createRef();
// const cartInfo = {
//     id: '5eruyt35eggr76476236523t3',
//     description: 'T Shirt - With react Native Logo',
//     amount: 1,
//     renderDataTrue: false
// }



// export default class PaymentPage extends React.Component {
//     constructor(props) {
//     super(props);
//     this.inputRef = React.createRef();
//     this.state = {
//         response : '',
//         makePayment: false,
//         paymentStatus:'',
//         PayUModalVisibility: false,
//         parsedData : '',
//         renderDataTrue: false,
//         webKey : 1
//     }
// }

//     callMethod = () => {
//         this.setState({
//             webKey : this.state.webKey +1
//         })
//     }

//     componentDidMount = () => {
//         const {zIndexOfPayment, navigation} = this.props;
//         this.callMethod();
//         BackHandler.addEventListener('hardwareBackPress', () => {
//         //    alert(JSON.stringify(WEBVIEW_REF));
//         // console.log(WEBVIEW_REF);
//         this.callMethod();
//         });
//         this.setState({
//             renderDataTrue : false
//         })
//         setTimeout(() => {
//             this.setState({
//                 renderDataTrue : true,
//                 paymentUri : 'https://kittu7878545423.000webhostapp.com/index.php'
//             })    
//         }, 5000);

//         navigation.addListener("focus", () => {
//             console.log("=====================================================================");
//             console.log(this.inputRef);
//             this.setState({
//                 renderDataTrue : true,
//                 paymentUri : 'https://kittu7878545423.000webhostapp.com/index.php'

//             })
//             this.checkPayment();
//             this.setHashCode();

//           });

//     }
//     getMagicResponse(resp) {
//         console.log(resp);
//             if (resp.status === 'success') {
//                 console.log("SUCCESS");

//                 //do whatever u want
//             }
//           }


//           onShouldStartLoadWithRequest(navigator) {
//         return true; 
//         }  

//         setHashCode = async () => {
//             try {
//                 const datataaa = {
//                     "key" : "lRPTChYM",
//                     "salt": "Sbvdj9epnT",
//                     "txnId": "Txn50433115",
//                     "amount": "100.0",
//                     "pinfo": "hello",
//                     "fname": "krishna",
//                     "email": "krishna.santho08@gmail.com",
//                     "mobile": "9912342530",
//                 };

//             const res = await axios.post(`https://kittu7878545423.000webhostapp.com/index.php`, 
//            datataaa
//        , {
//             headers: { 
//                 'Access-Control-Allow-Origin': '*',
//                 'contentType': "application/json",
//                 'dataType': 'json',
//               },
//         });
//         console.log(res);

//     } catch (e) {
//         alert(JSON.stringify(e));
//         console.log(e);
//     }

//         }


//     checkPayment =  async  () => {
//         // const data = await AsyncStorage.getItem('order');
//         // alert(data);
//         const parsedData = JSON.parse(data);
//         this.setState({
//             parsedData : parsedData
//         });


//         const data1 = HashGenerator({
//             key: "7mjSzv",
//             amount: "10.0",
//             email: "krishna.santho08@gmail.com",
//             txnId: parsedData.order.order_id,
//             productName: "product_info",
//             firstName: "firstname",
//             salt: "IMSqiPaKnPPJfudTXRiHfi7Mjece0sWp",
//             // key
//             // |txnid|
//             // amount|
//             productinfo :"product_info",
//             // firstname|
//             // email |
//             // udf1|udf2|udf3|udf4|udf5|
//             // salt
//         });
//         alert(data);
//     }



//         render() {
//             const { makePayment, renderDataTrue, paymentUri, webKey } = this.state;
//             const  { route } = this.props;
//             console.log(this.props);
//             // const onlineObj = { 
//             //     amount: 10.0,
//             //     txid: "123123123" ,
//             //     productInfo: "test",
//             //     firstname: "Name",
//             //     lastname : "Krishna",
//             //     email: "test@gmail.com",
//             //     phone: "8826343434",
//             //     id: "7440824",
//             //     key: "lRPTChYM",
//             //     surl: "https://www.payumoney.com/mobileapp/payumoney/success.php",
//             //     furl: "https://www.payumoney.com/mobileapp/payumoney/failure.php",
//             //     };

//     const runFirst = `
//             document.getElementById("key").value = 'lRPTChYM';
//             document.getElementById("salt").value = 'Sbvdj9epnT';
//             document.getElementById("txnid").value = 'Txn50433115';
//             document.getElementById("amount").value = '${route.params.totalPrice}';
//             document.getElementById("pinfo").value = 'hello';
//             document.getElementById("fname").value = 'krishna';
//             document.getElementById("email").value = 'krishna.santho08@gmail.com';
//             document.getElementById("mobile").value = '9912342530';            
//             createHashKey();
//             setTimeout(() => {
//                 launchBOLT();
//             }, 3000);

//           `;
//           if(renderDataTrue){
//             return (
//                 <WebView

//                 ref={this.inputRef}
//                   onLoad={
//                     e => {
//                       // Update the state so url changes could be detected by React and we could load the mainUrl.
//                        e.nativeEvent.url = paymentUri;
//                     }
//                 }
//                 key={this.state.webKey}
//                     // style={{zIndex:10}}

//                     javaScriptEnabled={true}
//     domStorageEnabled={true}
//     startInLoadingState={true}
//                      injectedJavaScript={runFirst}
//                     source={{
//                         uri: paymentUri
//                       }}
//                     />);
//          } else {
//              return (<View />);
//          } 

//     }
// }

// {/* <PayUMoneyScreen
//             //   visible={PayUModalVisibility}
//               onCloseModal={() =>
//                 this.setState({PayUModalVisibility: false, billingData: []})
//               }
//               getMagicResponse={magicResponse =>
//                 this.getMagicResponse(magicResponse)
//               }
//               paymentOptions={onlineObj}
//             /> */}

// const styles = StyleSheet.create({
//     container: { flex: 1, paddingTop: 100},
//     navigation: { flex: 2, backgroundColor: 'red' },
//     body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
//     footer: { flex: 1, backgroundColor: 'cyan' }
// })


export default function PaymentScreen({ route, navigation }) {

  const runFirst = `
             document.getElementById("key").value = 'lRPTChYM';
             document.getElementById("salt").value = 'Sbvdj9epnT';
             document.getElementById("txnid").value = 'Txn50433115';
             document.getElementById("amount").value = '1.0';
             document.getElementById("pinfo").value = 'hello';
             document.getElementById("fname").value = 'krishna';
             document.getElementById("email").value = 'krishna.santho08@gmail.com';
             document.getElementById("mobile").value = '9912342530';            
             createHashKey();
             setTimeout(() => {
                 launchBOLT();
             }, 3000);

           `;


  const getMagicResponse = async (val) => {
    // alert(JSON.stringify(val.status));
    // route.params.placeOrderAction();
    if(val.status=='failure'){
        Toast.show({
            type: 'error',
            text1: 'Transaction Failed. Please try again',
        });
        navigation.goBack();
    } else {
        if(route!=undefined){
            Toast.show({
                type: 'success',
                text1: 'Transaction Completed Successfully.',
            });
            route.params.placeOrderAction();
            navigation.goBack();
        }
    }
  }

  const onShouldStartLoadWithRequest = (request) => {
    console.log(request.url);
    if(Platform.OS === 'ios') {
        return true;
    } else {
        return false;
    } 
   }

  var s = route.params.uri;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <WebView
      key={route.params.webKey}
      style={{ flex: 1 }}
      onMessage={event => {
        let response_data = JSON.parse(event.nativeEvent.data);
        getMagicResponse(response_data);
      }}
      onHttpError={event => {
      alert(json.stringify(event));
      navigation.goBack();
      }}
    //   onShouldStartLoadWithRequest={(rq) => onShouldStartLoadWithRequest(rq)}
    //   onShouldStartLoadWithRequest={(req)=> console.log(req)}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
    //   injectedJavaScript={runFirst}
      source={{
        // uri: route.params.uri
        uri: 'https://pmny.in/qINmkjqqAEBw'
      }}
      onError ={(e) => {
        alert('failed by bye');
        navigation.goBack();
      }}
    />
  )
}

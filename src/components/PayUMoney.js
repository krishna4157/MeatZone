import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Button, Text} from 'native-base';
import {WebView} from 'react-native-webview';

// import styles from './styles';

class PayUMoneyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myWebView;
    this.state = {
      response: '',
    };
  }

  componentDidMount = () => {
    //   alert('hello');
  }

  render() {
    const {
      visible,
      getMagicResponse,
      paymentOptions: {amount, productinfo, firstname, lastname, email, phone},paymentOptions
    } = this.props;
    ;

    return (
      <Modal
        animationType={'slide'}
        visible={true}
        onRequestClose={() => {}}>
        <View style={{flex:1}} >
          <WebView
            ref={el => (this.myWebView = el)}
            startInLoadingState={true}
            useWebKit={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
            automaticallyAdjustContentInsets={true}
            injectedJavaScript={runFirst}
            onMessage={event => {
              let response_data = JSON.parse(event.nativeEvent.data);
              getMagicResponse(response_data);
            }}
            source={{
              uri: 'https://pmny.in/qINmkjqqAEBw',
              headers: { 
                'Access-Control-Allow-Origin': '*',
              },
              crossdomain: true, 
                body : paymentOptions            
            }}
          />
        </View>
      </Modal>
    );
  }
}

export default PayUMoneyScreen;
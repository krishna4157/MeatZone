import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


class SelectLocationScreen extends React.Component {


render(){
    const {navigation} = this.props;
return (
    <View style={{ flex: 1, marginTop: 50, backgroundColor: 'white' }}>
      <View style={{ flex: 4, backgroundColor: 'white' }}>
        <View style={{ flex: 3, backgroundColor: 'white' }}>
        </View>
        <View style={{ flex: 3, backgroundColor: 'white', marginTop: 30 }}>
          <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Hi, Nice to meet you!</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 15, color: 'grey', padding: 80,marginTop:-40 }}>Choose your to start find meat shop around you.</Text>
        </View>
      </View>
      <View style={{ flex: 2,padding:20,flexDirection:'column' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%', borderColor:'red',borderWidth:2, padding: 15, borderRadius: 15,flexDirection:'row',justifyContent:'center' }}>
                  <AntDesign name="check" size={25}  />
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black',marginLeft:10 }}>Use Current Location</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{padding:20}}>
        <Text  style={{textAlign:'center',textDecorationLine: 'underline'}}>Select it Manually</Text>
    </TouchableOpacity>
      </View>
    </View>
  );

}
}

export default SelectLocationScreen;

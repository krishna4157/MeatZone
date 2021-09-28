import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper,Cell } from 'react-native-table-component';
import api from '../utils/api';

export default class VendorOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading : false,
      tableHead: ['Order id', 'Amount','Order Status', 'Date'],
      tableData: [],
    }
  }

  componentDidMount = async () => {
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
        loading : true
    })
    const res = await api.get(`/myProfile`, {
      headers: { 
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${retrieveAccessTocken}`,
        },
  });
  var tableRows = [];

  res.data.myOrders.map((value, index)=> {
    var temp = [value.order_id,value.payable_price,value.status,value.updated_at];
    tableRows.push(temp);
  });

  this.setState({
      tableData : tableRows
  });
  this.setState({
      loading: false
  })
    }

  renderImage = (cellData, index) => {
    return (<View style={{flexDirection:'column'}}>
    <Text style={{textAlign:'center'}}>Order Recieved</Text>
    <TouchableOpacity style={{padding:15,backgroundColor:'red',borderRadius:10,marginTop:5}}>
    <Text style={{textAlign:'center'}}>Change Status</Text>
    </TouchableOpacity>
    </View>);
  }

  renderText = (cellData, index) => {
    return (<View style={styles.text}>
    <TouchableOpacity 
    // onPress={()=> this.props.navigation.navigate('VendorOrderDetailsPage')} 
    style={{padding:15,borderRadius:10,marginTop:5}}>
    <Text style={{textAlign:'center'}}>View Order</Text>
    </TouchableOpacity>
    </View>);
  }

  render() {
    const state = this.state;
    return (
        <View style={{flex:1,flexDirection:'column'}}>
                      <Text style={{fontSize:30,fontWeight:'bold',padding:20}}>My Orders</Text>

            {state.loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center',alignSelf:'center'}}>
              
              <ActivityIndicator style={{alignSelf:'center'}} size="large" color="red" />
             </View>}
      <ScrollView horizontal >
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',justifyContent:'center',borderBottomWidth:3}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex == 4 ? this.renderText(cellData,cellIndex) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97'},
    text: { margin: 6,width:150},
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

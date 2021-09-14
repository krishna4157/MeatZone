import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
 
export default class VendorOrderDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Image', 'Name', 'Price', 'Qty','Total'],
      tableData: [
        ['1', '2', '3', '4','Head'],
        ['a', 'b', 'c', 'd','Head'],
      ]
    }
  }

  renderImage = (cellData, index) => {
    return (<View style={{padding:10}}>
    <Image style={{width:90,height:60}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
    </View>);
  } 
 
  render() {
    const state = this.state;
    return (
        <ScrollView style={{flexDirection:'column'}}>
            <Text style={{fontWeight:'bold'}}>
                      Shipping Address
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text>Name</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Email</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Phone</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Address</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Landmark</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>City</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Phone</Text>
                        <Text>Name</Text>
                    </View>

                    <Text style={{fontWeight:'bold'}}>
                      Order Summary1
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text>Order id</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Amount Paid</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Status</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Address</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Landmark</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>City</Text>
                        <Text>Name</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>Phone</Text>
                        <Text>Name</Text>
                    </View>



      <ScrollView horizontal >
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',justifyContent:'center',borderBottomWidth:3}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 0 ? this.renderImage(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </ScrollView>
      </ScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6, width: 100 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

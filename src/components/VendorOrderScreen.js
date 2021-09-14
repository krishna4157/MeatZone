import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper,Cell } from 'react-native-table-component';
 
export default class VendorOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Order id', 'Customer Payable Price', 'Admin Comission', 'Your Amount','Name', 'Email', 'Phone', 'Order Status','Ordered Date','Delivered Date'],
      tableData: [
        ['Order id', 'Customer Payable Price', 'Admin Comission', 'Your Amount','Name', 'Email', 'Phone', 'Order Status','Ordered Date','Delivered Date'],
        ['1', '2', '3', '4','4', '5', '6', '7','8','9'],
        ]
    }
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
    return (<View style={{padding:10,flexDirection:'column'}}>
    <TouchableOpacity onPress={()=> this.props.navigation.navigate('VendorOrderDetailsPage')} style={{padding:15,borderRadius:10,marginTop:5}}>
    <Text style={{textAlign:'center'}}>Order No</Text>
    </TouchableOpacity>
    </View>);
  }

  render() {
    const state = this.state;
    return (
        <View style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('VendorCategoryCreatePage')} style={{padding:15,backgroundColor:'red',width:'30%',borderRadius:15,margin:10}}>
                <Text style={{textAlign:'center'}}>CREATE</Text>
                </TouchableOpacity>
      <ScrollView horizontal >
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',justifyContent:'center',borderBottomWidth:3}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 7 ? this.renderImage(cellData, index) : cellIndex === 0 ? this.renderText(cellData, index) : cellData} textStyle={styles.text}/>
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
    text: { margin: 6},
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

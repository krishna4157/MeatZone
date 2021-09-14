import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';
 
export default class VendorCategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4','Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4','Head', 'Head2', 'Head3', 'Head4'],
        ['a', 'b', 'c', 'd','Head', 'Head2', 'Head3', 'Head4'],
        ['1', '2', '3', '456\n789','Head', 'Head2', 'Head3', 'Head4'],
        ['a', 'b', 'c', 'd','Head', 'Head2', 'Head3', 'Head4']
      ]
    }
  }

  renderImage = (cellData, index) => {
    return (<View style={{padding:10}}>
    <Image style={{width:120,height:90}} source={require('../assets/AppIcons/web_hi_res_512.png')} />
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
                    <Cell key={cellIndex} data={cellIndex === 0 ? this.renderImage(cellData, index) : cellData} textStyle={styles.text}/>
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
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6, width: 128 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

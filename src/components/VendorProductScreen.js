import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import api from '../utils/vendorApi';

export default class VendorProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Image', 'Name', 'Mrp Price', 'Selling Price','Category', 'Status', 'Action'],
      tableData: [
        ['1', '2', '3', '4','Head', 'Head2', 'Head3', 'Head4'],
        ['1', '2', '3', '4','Head', 'Head2', 'Head3', 'Head4'],
      ],
      renderData : ""
    }
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    // alert("hello");
    // await AsyncStorage.setItem('accessToken',"");
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        alert(retrieveAccessTocken);
        // this.setState({
        //     loading : true
        // });
        try {
        const res = await api.get(`/myMenu`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });


    alert(JSON.stringify(res.data));
        var tableRows = [];
    res.data.menu.map((value, index)=> {
      var temp = [value.image,value.name,value.mrp_price,value.selling_price,"Chicken",value.status,"hello"];
      alert(JSON.stringify(temp));
      tableRows.push(temp);
    });
    alert(JSON.stringify(tableRows));
    this.setState({
      tableData : tableRows
    });
      } catch (e) {
        // alert(JSON.stringify(e));
      }
  }

  deleteAction = () => {
    // const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    // this.setState({
    //   loading : true
    // })
    // const res = await api.delete(`/deleteItem/${0}`, {
    //     headers: { 
    //         'Access-Control-Allow-Origin': '*',
    //         "Authorization": `Bearer ${retrieveAccessTocken}`,
    //       },
    // },{
    //   name : '',
    //   category_id : '',
    //   image:'',
    //   weight:'',
    //   mrp_price:'',
    //   selling_price:''
    // });

    this.setState({
      loading : false
    })

  }

  renderImage = (cellData, index) => {

    return (<View style={{padding:10}}>
    <Image style={{width:120,height:90}} source={{uri : cellData}} />
    </View>);
  } 

  renderAction = (cellData, index) => {

    return (<View style={{padding:10,flexDirection:'row',justifyContent:'space-around',width:140}}>
    <Feather onPress={()=>this.deleteAction()} name="edit" size={30} />
    <MaterialCommunityIcons onPress={()=>alert('hello')} name="delete" size={30} color={"red"}/>
    </View>);
  }
 
  render() {
    const state = this.state;
    return (
        <View style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('VendorProductCreatePage')} style={{padding:15,backgroundColor:'red',width:'30%',borderRadius:15,margin:10}}>
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
                    <Cell key={cellIndex} data={cellIndex === 0 ? this.renderImage(cellData, index) : cellIndex === 6  ? this.renderAction(cellData, index) :cellData} textStyle={styles.text}/>
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

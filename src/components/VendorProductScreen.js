import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Toast from 'react-native-toast-message';
import api from '../utils/vendorApi';

// import
export default class VendorProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Image', 'Name', 'Mrp Price', 'Selling Price','Category', 'Status', 'Action'],
      tableData: [
      ],
      renderData : "",
      loading : false,
      menuData: ""
    }
  }

  componentDidMount = async () => {
    const { navigation} = this.props;
   this.refreshData();
   const unsubscribe = navigation.addListener('focus', () => {
    // Do whatever you want
    Toast.show({
        type: 'success',
        text1: 'Refreshing Table',
        // text2: 'This is some something 👋'
      });
    this.refreshData();
  });

  }

  refreshData= async() => {
    const {navigation} = this.props;
    this.setState({
      loading : true
    })
    // await AsyncStorage.setItem('accessToken',"");
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
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
        const res1 = await api.get(`/categories`, {
          headers: { 
              'Access-Control-Allow-Origin': '*',
              "Authorization": `Bearer ${retrieveAccessTocken}`,
            },
      });
        var tableRows = [];
        this.setState({
          menuData : res.data.menu
        });
    res.data.menu.map((value, index)=> {
      console.log(value);
      var item  = res1.data.message.find(val => val.id == value.category_id);
      var temp = [value.image,value.name,value.mrp_price,value.selling_price,item.name,value.status,""];
      tableRows.push(temp);
    });
    this.setState({
      tableData : tableRows
    });
    console.log(tableRows);
      } catch (e) {
      }

      this.setState({
        loading : false
      })
  }

  deleteAction = async (index) => {
    const {navigation} = this.props;
    this.setState({
      loading : true
    })
    // await AsyncStorage.setItem('accessToken',"");
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading : true
        });
        const category_id = this.state.menuData[index].id;
        try {
        const res = await api.delete(`/deleteItem/${category_id}`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        this.refreshData();
      } catch (e) {
      }

      this.setState({
        loading : false
      })
  }

  changeStatus = async (value, index) => {
    const {navigation} = this.props;
    this.setState({
      loading : true
    })
    const selectedItems = this.state.menuData[index];
    // alert(JSON.stringify(selectedItems));
    // await AsyncStorage.setItem('accessToken',"");
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    console.log(retrieveAccessTocken);
    console.log(selectedItems.id);
       
    this.setState({
            loading : true
        });
        var body =null;
        // alert(value);
        if(value == "Active") {
          body = 
            {
              status:"InActive"
          }
        } else {
          body = 
            {
              status:"Active"
          }
        }
        try {
        const res = await api.post(`/updateItemStatus/${selectedItems.id}`,body,{
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // alert(JSON.stringify(res.data));
        this.refreshData();
      } catch (e) {
        // alert(JSON.stringify(e));
      console.log(e);
      }

      this.setState({
        loading : false
      })
  }

  editAction = async (index) => {
    const {navigation} = this.props;
    this.setState({
      loading : true
    })
    // await AsyncStorage.setItem('accessToken',"");
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
        this.setState({
            loading : true
        });
        const selectedItems = this.state.menuData[index];
        try {
          console.log("hello :"+JSON.stringify(selectedItems));
          navigation.navigate('VendorProductCreatePage',{ 'sub_category_id' : selectedItems.sub_category_id,'category_id': selectedItems.category_id,'id' : selectedItems.id, 'parent_id' : selectedItems.id, 'itemName' : selectedItems.name, 'mrp_price' : selectedItems.mrp_price, 'selling_price' : selectedItems.selling_price, 'weight' : selectedItems.weight, 'update' : true, image : selectedItems.image });
        // const res = await api.delete(`/updateItem/${category_id}`, {
        //     headers: { 
        //         'Access-Control-Allow-Origin': '*',
        //         "Authorization": `Bearer ${retrieveAccessTocken}`,
        //       },
        // });
        // this.refreshData();
        // navigation.navigate()
      } catch (e) {
      }

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
    <Feather onPress={()=>this.editAction(index)} name="edit" size={30} />
    <MaterialCommunityIcons onPress={()=>this.deleteAction(index)} name="delete" size={30} color={"red"}/>
    </View>);
  }

  renderStatus = (cellData, index) => {

    return (<View style={{padding:10,flexDirection:'row',justifyContent:'space-around',width:140}}>
    <TouchableOpacity onPress={()=>{ this.changeStatus(cellData,index)}} style={{backgroundColor:'red',padding:10,borderRadius:20,paddingLeft:10,paddingRight:10}} >
      <Text style={{color:'white',fontWeight:'bold'}}>{'  '}{cellData}{'  '}</Text>
      </TouchableOpacity>
    </View>);
  }
 
  render() {
    const state = this.state;
    return (
        <ScrollView style={{flexDirection:'column',marginBottom:20}}>
           {state.loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('VendorProductCreatePage')} style={{padding:15,backgroundColor:'blue',width:'30%',borderRadius:15,margin:10}}>
                <Text style={{textAlign:'center',color:'white'}}>CREATE</Text>
                </TouchableOpacity>
      <ScrollView horizontal >
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',justifyContent:'center',borderBottomWidth:3}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 0 ? this.renderImage(cellData, index) : cellIndex === 6  ? this.renderAction(cellData, index) : cellIndex == 5 ? this.renderStatus(cellData,index) : cellData} textStyle={styles.text}/>
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
    text: { margin: 6, width: 128 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });

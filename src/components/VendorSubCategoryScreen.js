import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Toast from 'react-native-toast-message';
import api from '../utils/vendorApi';

// import
export default class VendorSubCategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Image', 'Name','Category', 'Status', 'Action'],
      tableData: [
        
      ],
      renderData : "",
      loading : false,
      menuData: "",
      renderCategories : []
    }
  }

  renderCategories = async () => {
      const { menuData} = this.state;
    const retrieveAccessTocken = await AsyncStorage.getItem('accessToken');
    this.setState({
        loading : true
    });
    try {
    const res = await api.get(`/categories`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${retrieveAccessTocken}`,
          },
    });
    this.setState({
      renderCategories : res.data.message,
        loading: false 
    });
    var tableRows = [];
    // alert(JSON.stringify(res.data.message));
    
    menuData.map((value, index)=> {

        var item  = res.data.message.find(val => val.id == value.parent_id);
        
        var temp = [value.image,value.name,item!=undefined ? item.name : "null",value.status,""];
        tableRows.push(temp);
      });

      this.setState({
        tableData : tableRows
      });

} catch(e){
    console.log(e);
}
this.setState({
    loading: false
});

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
        console.log(retrieveAccessTocken);
        try {
        const res = await api.get(`/category`, {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${retrieveAccessTocken}`,
              },
        });
        // alert(JSON.stringify(res.data.menu));
        this.setState({
          menuData : res.data.categories
        });
        this.renderCategories();

        // alert(JSON.stringify(res.data.categories));
    
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
        const res = await api.delete(`/category/${category_id}`, {
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
            // alert(JSON.stringify(selectedItems));
            // alert(selectedItems.parent_id);
          navigation.navigate('VendorSubCategoryCreatePage',{ 'id' : selectedItems.id,'parent_id' : selectedItems.parent_id , 'itemName' : selectedItems.name, 'update' : true, image : selectedItems.image });
        // const res = await api.delete(`/updateItem/${category_id}`, {
        //     headers: { 
        //         'Access-Control-Allow-Origin': '*',
        //         "Authorization": `Bearer ${retrieveAccessTocken}`,
        //       },
        // });
        // this.refreshData();
        navigation.navigate()
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
 
  render() {
    const state = this.state;
    return (
        <ScrollView style={{flexDirection:'column',marginBottom:20}}>
           {state.loading && <View style={{position:'absolute',zIndex:1,height:'100%',width:'100%',justifyContent:'center'}}>
              
              <ActivityIndicator size="large" color="red" />
             </View>}
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('VendorSubCategoryCreatePage')} style={{padding:15,backgroundColor:'blue',width:'30%',borderRadius:15,margin:10}}>
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
                    <Cell key={cellIndex} data={cellIndex === 0 ? this.renderImage(cellData, index) : cellIndex === 4  ? this.renderAction(cellData, index) :cellData} textStyle={styles.text}/>
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

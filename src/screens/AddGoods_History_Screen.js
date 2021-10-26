import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput ,TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "../constants/colos";
export class AddGoods_History_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      Branch_ID: "",
      Store_ID: "",
      Data_Res: [],
      Bill_Number: '',
      Origin: ''
    };
  }

  async componentDidMount() {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue != null) {
        console.log(JSON.parse(jsonValue).Branch_ID);
        console.log(JSON.parse(jsonValue).Store_ID);
        console.log(JSON.parse(jsonValue).ID);

        this.setState({
          Branch_ID: JSON.parse(jsonValue).Branch_ID,
          Store_ID: JSON.parse(jsonValue).Store_ID,
          ID: JSON.parse(jsonValue).ID,
        });
      } else {
        console.log("Not Data");
      }
    } catch (e) {}
    await axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getbuffer-cart-recive",
      data: {
        ID: this.state.ID,
        Store_ID: this.state.Store_ID,
        Branch_ID: this.state.Branch_ID,
      },
    }).then((res) => {
      if (res.data == "") {
        console.log("NoData");
      } else {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          this.setState({
            Data_Res: [
              {
                i,
                ...{
                  Goods_ID:res.data[i].Goods_ID,
                  Goods_Name: res.data[i].Goods_Name,
                  Cost_Total: res.data[i].Cost_Total,
                  Cost_Unit:res.data[i].Cost_Unit,
                  Count_Recive:res.data[i].Count_Recive
                },
              },
            ],
          });
        }
      }
    });
  }


  

  render() {
    console.log("Data_Res", this.state.Data_Res);

    const AddRecieveFN = async() => {
      //e.preventDefault()
      const currentdate = new Date();
      const dateOnAdd = currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1) +
      "-" +
      (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate()) +
      "T" +
      (currentdate.getHours() < 10
        ? "0" + currentdate.getHours()
        : currentdate.getHours()) +
      ":" +
      (currentdate.getMinutes() < 10
        ? "0" + currentdate.getMinutes()
        : currentdate.getMinutes()) +
      ":" +
      (currentdate.getSeconds() < 10
        ? "0" + currentdate.getSeconds()
        : currentdate.getSeconds())
  
        const genDate = currentdate.getFullYear() +
        
        (currentdate.getMonth() + 1 < 10
          ? "0" + (currentdate.getMonth() + 1)
          : currentdate.getMonth() + 1).toString() +
       
        (currentdate.getDate() < 10
          ? "0" + currentdate.getDate()
          : currentdate.getDate()).toString() +
       
        (currentdate.getHours() < 10
          ? "0" + currentdate.getHours()
          : currentdate.getHours()).toString() +
       
        (currentdate.getMinutes() < 10
          ? "0" + currentdate.getMinutes()
          : currentdate.getMinutes()).toString() +
       
        (currentdate.getSeconds() < 10
          ? "0" + currentdate.getSeconds()
          : currentdate.getSeconds()).toString()
      try {
          await axios.post('https://posappserver.herokuapp.com/postupdategoods',{
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
          Origin : this.state.Origin,
          DateAdd_History : dateOnAdd,
          GenDate: genDate,
          LinkBill : '',
          Bill_Number:this.state.Bill_Number
        }).then(()=>alert('เพิ่มสำเร็จ'))
  
  
      } catch (error) {
        console.log(error);
      }
      
    };


    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>รหัสสินค้า</DataTable.Title>
            <DataTable.Title>ชื่อสินค้า</DataTable.Title>
            <DataTable.Title>ราคาต่อหน่วย</DataTable.Title>
            <DataTable.Title>จำนวนที่รับ</DataTable.Title>
            <DataTable.Title>ราคารวม</DataTable.Title>
          </DataTable.Header>
          {this.state.Data_Res.map((item, index) => {
            return (
              <DataTable.Row>
                <DataTable.Cell key={index}>{item.Goods_ID}</DataTable.Cell>
                <DataTable.Cell key={index}>{item.Goods_Name}</DataTable.Cell>
                <DataTable.Cell key={index}>{item.Cost_Unit}</DataTable.Cell>
                <DataTable.Cell key={index}>{item.Count_Recive}</DataTable.Cell>
                <DataTable.Cell key={index}>{item.Cost_Total}</DataTable.Cell>
              </DataTable.Row>
              
            );
          })}
        </DataTable>
        <View style={{justifyContent:'center', alignItems:'center'}}>

        <TextInput
          style={myStyles.inputTop}
          placeholder="ระบุแหล่งที่มา"
          onChangeText={(text) => this.setState({
            Origin: text
          })}
          value={this.state.Origin}
        />
         <TextInput

          style={myStyles.input}
          placeholder="ระบุเลขบิล"
          onChangeText={(text) => this.setState({
            Bill_Number: text
          })}
          value={this.state.Bill_Number}
        />
            <TouchableOpacity 
              style={myStyles.roundButton1}
              onPress={() => AddRecieveFN()}>
              <Text style={{ color: Colors.white }}>เพิ่มแหล่งที่มา</Text>
            </TouchableOpacity>

        </View>
        
      </View>
    );
  }

  

}

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkpurple,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    width: 270,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputTop: {
    height: 35,
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    width: 270,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30
  },
  roundButton1: {
    width: 270,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.purple,
  },
});


export default AddGoods_History_Screen;

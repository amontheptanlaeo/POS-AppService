import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export class AddGoods_History_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      Branch_ID: "",
      Store_ID: "",
      Data_Res: [],
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
      </View>
    );
  }
}

export default AddGoods_History_Screen;

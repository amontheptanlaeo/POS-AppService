import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  RefreshControl,
} from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export class SellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      Branch_ID: "",
      Store_ID: "",
      Data_Res: [],
      B1000: 0,
      B500: 0,
      B100: 0,
      B50: 0,
      B20: 0,
      C10: 0,
      C5: 0,
      C2: 0,
      C1: 0,
      C50: 0,
      C25: 0,
      SumGoods: 0,
      Money_User: 0,
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
    } catch (err) {
      console.log(err);
    }
    const interval = setInterval(() => {
      axios({
        method: "POST",
        url: "https://posappserver.herokuapp.com/getbuffer-cart-sell",
        data: {
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
        },
      }).then((res) => {
        console.log(res);
        this.setState({
          Data_Res: res.data,
        });
      });
      axios({
        method: "POST",
        url: "https://posappserver.herokuapp.com/getbuffer-cart-sell-total",
        data: {
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
        },
      }).then((res) => {
        this.setState({ SumGoods: res.data[0]["SUM(Price_Total)"] });
      });
  
    }, 4500);
    return () => clearInterval(interval);
  }

  render() {
   
    const onDeleteCartSell = (value) => {
      axios({
        method: "POST",
        url: "https://posappserver.herokuapp.com/deletebuffer-cart-sell",
        data: {
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
          Goods_ID: value.Goods_ID,
        },
      }).then((res) => {});
    };

    var B1000Add = 0;
    var B500Add = 0;
    var B100Add = 0;
    var B50Add = 0;
    var B20Add = 0;
    var C10Add = 0;
    var C5Add = 0;
    var C2Add = 0;
    var C1Add = 0;
    var C50Add = 0;
    var C25Add = 0;
    const onExchange = () => {
      axios({
        method: "POST",
        url: "https://posappserver.herokuapp.com/checkbankdaily",
        data: {
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
        },
      }).then((resp) => {
        var checktotal = resp.data[0].MoneyTotal;
        if (this.state.Money_User <= checktotal) {
          var value = this.state.Money_User - this.state.SumGoods;
          var value_withdraw = this.state.Money_User - this.state.SumGoods;
          console.log("จำนวนเงินที่ต้องทอน: ", value);
          if (value >= 1000) {
            var Pay = Math.floor(value / 1000);
            value = value - Pay * 1000;
            if (Pay > resp.data[0].B1000) {
              var ex = Pay - resp.data[0].B1000;
              value = value + ex * 1000;
              Pay = resp.data[0].B1000;
              this.setState({ B1000: 0 });
            } else {
              this.setState({ B1000: resp.data[0].B1000 - Pay });
            }
            B1000Add = Pay;
            console.log("จำนวนแบงค์ 1000: ", Pay);
          }
          if (value >= 500) {
            var Pay = Math.floor(value / 500);
            value = value - Pay * 500;
            if (Pay > resp.data[0].B500) {
              var ex = Pay - resp.data[0].B500;
              value = value + ex * 500;
              Pay = resp.data[0].B500;
              this.setState({ B500: 0 });
            } else {
              this.setState({ B500: resp.data[0].B500 - Pay });
            }
            B500Add = Pay;
            console.log("จำนวนแบงค์ 500: ", Pay);
          }
          if (value >= 100) {
            var Pay = Math.floor(value / 100);
            value = value - Pay * 100;
            if (Pay > resp.data[0].B100) {
              var ex = Pay - resp.data[0].B100;
              value = value + ex * 100;
              Pay = resp.data[0].B100;
              this.setState({ B100: 0 });
            } else {
              this.setState({ B100: resp.data[0].B100 - Pay });
            }
            B100Add = Pay;
            console.log("จำนวนแบงค์ 100: ", Pay);
          }
          if (value >= 50) {
            var Pay = Math.floor(value / 50);
            value = value - Pay * 50;
            if (Pay > resp.data[0].B50) {
              var ex = Pay - resp.data[0].B50;
              value = value + ex * 50;
              Pay = resp.data[0].B50;
              this.setState({ B50: 0 });
            } else {
              this.setState({ B50: resp.data[0].B50 - Pay });
            }
            B50Add = Pay;
            console.log("จำนวนแบงค์ 50: ", Pay);
          }
          if (value >= 20) {
            var Pay = Math.floor(value / 20);
            value = value - Pay * 20;
            if (Pay > resp.data[0].B20) {
              var ex = Pay - resp.data[0].B20;
              value = value + ex * 20;
              Pay = resp.data[0].B20;
              this.setState({ B20: 0 });
            } else {
              this.setState({ B20: resp.data[0].B20 - Pay });
            }
            B20Add = Pay;
            console.log("จำนวนแบงค์ 20: ", Pay);
          }
          if (value >= 10) {
            var Pay = Math.floor(value / 10);
            value = value - Pay * 10;
            if (Pay > resp.data[0].C10) {
              var ex = Pay - resp.data[0].C10;
              value = value + ex * 10;
              Pay = resp.data[0].C10;
              this.setState({ C10: 0 });
            } else {
              this.setState({ C10: resp.data[0].C10 - Pay });
            }
            C10Add = Pay;
            console.log("จำนวนเหรียญ 10: ", Pay);
          }

          if (value >= 5) {
            var Pay = Math.floor(value / 5);
            value = value - Pay * 5;
            if (Pay > resp.data[0].C5) {
              var ex = Pay - resp.data[0].C5;
              value = value + ex * 5;
              Pay = resp.data[0].C5;
              this.setState({ C5: 0 });
            } else {
              this.setState({ C5: resp.data[0].C5 - Pay });
            }
            C5Add = Pay;
            console.log("จำนวนเหรียญ 5: ", Pay);
          }
          if (value >= 2) {
            var Pay = Math.floor(value / 2);
            value = value - Pay * 2;
            if (Pay > resp.data[0].C2) {
              var ex = Pay - resp.data[0].C2;
              value = value + ex * 2;
              Pay = resp.data[0].C2;
              this.setState({ C2: 0 });
            } else {
              this.setState({ C2: resp.data[0].C2 - Pay });
            }
            C2Add = Pay;
            console.log("จำนวนเหรียญ 2: ", Pay);
          }
          if (value >= 1) {
            var Pay = Math.floor(value / 1);
            value = value - Pay * 1;
            if (Pay > resp.data[0].C1) {
              var ex = Pay - resp.data[0].C1;
              value = value + ex * 1;
              Pay = resp.data[0].C1;
              this.setState({ C1: 0 });
            } else {
              this.setState({ C1: resp.data[0].C1 - Pay });
            }
            C1Add = Pay;
            console.log("จำนวนเหรียญ 1: ", Pay);
          }

          if (value >= 0.5) {
            var Pay = Math.floor(value / 0.5);
            value = value - Pay * 0.5;
            if (Pay > resp.data[0].C1) {
              var ex = Pay - resp.data[0].C50;
              value = value + ex * 0.5;
              Pay = resp.data[0].C50;
              this.setState({ C50: 0 });
            } else {
              this.setState({ C50: resp.data[0].C50 - Pay });
            }
            C50Add = Pay;
            console.log("จำนวนเหรียญ 50 สตางค์: ", Pay);
          }

          if (value >= 0.25) {
            var Pay = Math.floor(value / 0.25);
            value = value - Pay * 0.25;
            if (Pay > resp.data[0].C25) {
              var ex = Pay - resp.data[0].C25;
              value = value + ex * 0.25;
              Pay = resp.data[0].C25;
              this.setState({ C25: 0 });
            } else {
              this.setState({ C25: resp.data[0].C25 - Pay });
            }
            C25Add = Pay;
            console.log("จำนวนเหรียญ 25 สตางค์: ", Pay);
          }
        }

        var total =
          B1000Add * 1000 +
          B500Add * 500 +
          B100Add * 100 +
          B50Add * 50 +
          B20Add * 20 +
          C10Add * 10 +
          C5Add * 5 +
          C2Add * 2 +
          C1Add * 1 +
          C50Add * 0.5 +
          C25Add * 0.25;
        const currentdate = new Date();
        const DateAdd =
          currentdate.getFullYear() +
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
            : currentdate.getSeconds());

        var GenDate =
          currentdate.getFullYear().toString() +
          (currentdate.getMonth() + 1 < 10
            ? "0" + (currentdate.getMonth() + 1)
            : currentdate.getMonth() + 1
          ).toString() +
          (currentdate.getDate() < 10
            ? "0" + currentdate.getDate()
            : currentdate.getDate()
          ).toString() +
          (currentdate.getHours() < 10
            ? "0" + currentdate.getHours()
            : currentdate.getHours()
          ).toString() +
          (currentdate.getMinutes() < 10
            ? "0" + currentdate.getMinutes()
            : currentdate.getMinutes()
          ).toString() +
          (currentdate.getSeconds() < 10
            ? "0" + currentdate.getSeconds()
            : currentdate.getSeconds()
          ).toString();
        var data_api = {
          DateAdd: DateAdd,
          MoneyTotal: value_withdraw,
          B1000Add: B1000Add,
          B500Add: B500Add,
          B100Add: B100Add,
          B50Add: B50Add,
          B20Add: B20Add,
          C10Add: C10Add,
          C5Add: C5Add,
          C2Add: C2Add,
          C1Add: C1Add,
          C50Add: C50Add,
          C25Add: C25Add,
          ID: this.state.ID,
          Store_ID: this.state.Store_ID,
          Branch_ID: this.state.Branch_ID,
          GenDate: GenDate,
        };
        console.log("total", total);
        if (total == value_withdraw) {
          alert("ยอดเงินเพียงพอ");
          axios({
            method: "POST",
            url: "https://posappserver.herokuapp.com/sellgoods-withdraw",
            data: data_api,
          }).then((res) => {
            this.setState({ setMoney_User: null });
            console.log(res);
            alert("Success");
            
          });
        } else {
          alert("แบงค์ไม่พอ");
        }
      });
    };

    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ชื่อสินค้า</DataTable.Title>
            <DataTable.Title>จำนวน</DataTable.Title>
            <DataTable.Title>ราคา</DataTable.Title>
            <DataTable.Title>ราคารวม</DataTable.Title>
          </DataTable.Header>
          {this.state.Data_Res.map((item, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.Goods_Name}</DataTable.Cell>
                <DataTable.Cell>{item.Count_Sell}</DataTable.Cell>
                <DataTable.Cell>{item.Price_Unit}</DataTable.Cell>
                <DataTable.Cell>{item.Price_Total}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
        <Text>ยอดรวม:{this.state.SumGoods}</Text>
        <TextInput
          onChangeText={(text) => this.setState({ Money_User: text })}
          value={this.state.Money_User}
          placeholder="จำนวนเงินที่รับมาจากลูกค้า"
        />
        <Button title={"ชำระเงิน"} onPress={() => onExchange()} />
      </View>
    );
  }
}

export default SellScreen;

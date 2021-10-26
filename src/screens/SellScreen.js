import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SellScreen() {
  const [MoneyTotal, setMoneyTotal] = useState(0);
  const [B1000, setB1000] = useState(0);
  const [B500, setB500] = useState(0);
  const [B100, setB100] = useState(0);
  const [B50, setB50] = useState(0);
  const [B20, setB20] = useState(0);
  const [C10, setC10] = useState(0);
  const [C5, setC5] = useState(0);
  const [C2, setC2] = useState(0);
  const [C1, setC1] = useState(0);
  const [C50, setC50] = useState(0);
  const [C25, setC25] = useState(0);
  const [checkTable, setcheckTable] = useState(false);
  //   const [B1000Add, setB1000Add] = useState(0);
  //   const [B500Add, setB500Add] = useState(0);
  //   const [B100Add, setB100Add] = useState(0);
  //   const [B50Add, setB50Add] = useState(0);
  //   const [B20Add, setB20Add] = useState(0);
  //   const [C10Add, setC10Add] = useState(0);
  //   const [C5Add, setC5Add] = useState(0);
  //   const [C2Add, setC2Add] = useState(0);
  //   const [C1Add, setC1Add] = useState(0);
  //   const [C50Add, setC50Add] = useState(0);
  //   const [C25Add, setC25Add] = useState(0);
  const [data_Map, setdata_Map] = useState([]);
  const [SumGoods, setSumGoods] = useState(0);
  const [Money_User, setMoney_User] = useState(null);
  const [Branch_ID, setBranch_ID] = useState(null);
  const [Store_ID, setStore_ID] = useState(null);
  const [ID, setID] = useState(null);
  useEffect(() => {
    
    const interval = setInterval(() => {
      console.log(555555555)
      getData();
      fetchDataCartSell();
      getTotal();
    }, 4500);
    return () => clearInterval(interval);
  },[]);
  /////
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue != null) {
        console.log(JSON.parse(jsonValue));
        setBranch_ID(JSON.parse(jsonValue).Branch_ID);
        setStore_ID(JSON.parse(jsonValue).Store_ID);
        setID(JSON.parse(jsonValue).ID);
      } else {
        console.log("Not Data");
      }
    } catch (e) {
      // error reading value
    }
  };
  const fetchDataCartSell = () => {
    console.log(ID);
    console.log(Store_ID);
    console.log(Branch_ID);
    axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getbuffer-cart-sell",
      data: {
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
      },
    }).then((res) => {
      var data_res = [];
      console.log(res);

      for (let i = 0; i < res.data.length; i++) {
        data_res.push(
          {
            Goods_ID: res.data[i].Goods_ID,
            Goods_Name: res.data[i].Goods_Name,
            Count_Sell: res.data[i].Count_Sell,
            Price: res.data[i].Price_Unit,
            Price_Total: res.data[i].Price_Total,
          }
        );
      }
      setdata_Map(data_res);
    });
  };
  const onDeleteCartSell = (value) => {
    axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/deletebuffer-cart-sell",
      data: {
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
        Goods_ID: value.Goods_ID,
      },
    }).then((res) => {
      fetchDataCartSell();
    });
  };
  const getTotal = async () => {
    await axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getbuffer-cart-sell-total",
      data: {
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
      },
    }).then((res) => {
      setSumGoods(res.data[0]["SUM(Price_Total)"]);
    });
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
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
      },
    }).then((resp) => {
      var checktotal = resp.data[0].MoneyTotal;
      if (Money_User <= checktotal) {
        var value = Money_User - SumGoods;
        var value_withdraw = Money_User - SumGoods;
        console.log("จำนวนเงินที่ต้องทอน: ", value);
        if (value >= 1000) {
          var Pay = Math.floor(value / 1000);
          value = value - Pay * 1000;
          if (Pay > resp.data[0].B1000) {
            var ex = Pay - resp.data[0].B1000;
            value = value + ex * 1000;
            Pay = resp.data[0].B1000;
            setB1000(0);
          } else {
            setB1000(resp.data[0].B1000 - Pay);
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
            setB500(0);
          } else {
            setB500(resp.data[0].B500 - Pay);
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
            setB100(0);
          } else {
            setB100(resp.data[0].B100 - Pay);
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
            setB50(0);
          } else {
            setB50(resp.data[0].B50 - Pay);
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
            setB20(0);
          } else {
            setB20(resp.data[0].B20 - Pay);
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
            setC10(0);
          } else {
            setC10(resp.data[0].C10 - Pay);
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
            setC5(0);
          } else {
            setC5(resp.data[0].C5 - Pay);
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
            setC2(0);
          } else {
            setC2(resp.data[0].C2 - Pay);
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
            setC1(0);
          } else {
            setC1(resp.data[0].C1 - Pay);
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
            setC50(0);
          } else {
            setC50(resp.data[0].C50 - Pay);
          }
          C50Add = Pay;
          console.log("จำนวนเหรียญ 25 สตางค์: ", Pay);
        }
        if (value >= 0.25) {
          var Pay = Math.floor(value / 0.25);
          value = value - Pay * 0.25;
          if (Pay > resp.data[0].C25) {
            var ex = Pay - resp.data[0].C25;
            value = value + ex * 0.25;
            Pay = resp.data[0].C25;
            setC25(0);
          } else {
            setC25(resp.data[0].C25 - Pay);
          }
          C25Add = Pay;
          console.log("จำนวนเหรียญ 25 สตางค์: ", Pay);
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
          ID: ID,
          Store_ID: Store_ID,
          Branch_ID: Branch_ID,
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
            console.log(res);
            alert("Success");
            fetchDataCartSell();
            setMoney_User(null);
            getTotal();
          });
        } else {
          alert("จำนวนแบงค์ไม่พอ");
        }
      } else {
        alert("ยอดเงินไม่เพียงพอ");
      }
    });
  };
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ชื่อสินค้า</DataTable.Title>
          <DataTable.Title numeric>จำนวน</DataTable.Title>
          <DataTable.Title numeric>ราคา</DataTable.Title>
          <DataTable.Title numeric>ราคารวม</DataTable.Title>
          <DataTable.Title numeric>ลบ</DataTable.Title>
        </DataTable.Header>

        {data_Map.map((value, index) => {
          return (
            <DataTable.Row>
              <DataTable.Cell key={index}>{value.Goods_Name}</DataTable.Cell>
              <DataTable.Cell numeric key={index}>
                {value.Count_Sell}
              </DataTable.Cell>
              <DataTable.Cell numeric key={index}>
                {value.Price}
              </DataTable.Cell>
              <DataTable.Cell numeric key={index}>
                {value.Price_Total}
              </DataTable.Cell>
              <DataTable.Cell numeric key={index}>
                <Button
                  title={"ลบ"}
                  onPress={() => {
                    onDeleteCartSell(value);
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Text>ยอดรวม:{SumGoods}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMoney_User(text)}
        value={Money_User}
        placeholder="จำนวนเงินที่รับมาจากลูกค้า"
      />
      <Button title={"ชำระเงิน"} onPress={() => onExchange()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

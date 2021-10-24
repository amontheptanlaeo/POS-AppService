import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Barcode_SellGoods = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [Goods_ID, setGoods_ID] = useState(null);
  const [Price, setPrice] = useState(null);
  const [Goods_Name, setGoods_Name] = useState(null);
  const [Count_Sell, setCount_Sell] = useState(null);
  const [Price_Unit, setPrice_Unit] = useState(null);
  const [Branch_ID, setBranch_ID] = useState(null);
  const [Store_ID, setStore_ID] = useState(null);
  const [ID, setID] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    getData()
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue != null) {
        console.log("สแกนขาย",JSON.parse(jsonValue));
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
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getallgoods-native",
      data: {
        Branch_ID:Branch_ID,
        Goods_ID: data,
      },
    }).then((res) => {
      setGoods_ID(data);
      setGoods_Name(res.data[0].Goods_Name);
      setPrice_Unit(res.data[0].Price)
      setModalVisible(true);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onSubmitCart = async () => {
    const currentdate = new Date();
    const dateOnAdd =
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

    await axios.post(
      "https://posappserver.herokuapp.com/postbuffer-cart-sell",
      {
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
        Goods_ID: Goods_ID,
        Count_Sell: Count_Sell,
        Price_Unit: Price_Unit,
        DateAdd: dateOnAdd,
      }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>กรอกจำนวนที่ต้องการเพิ่ม</Text>
              <Text>เลขบาร์โค้ด</Text>
              <TextInput
                style={styles.input}
                onChangeText={setGoods_ID}
                value={Goods_ID}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <Text>ชื่อสินค้า {Goods_Name}</Text>
              <Text>จำนวนที่ต้องการ</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCount_Sell}
                value={Count_Sell}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <Text>ราคา ต่อชิ้น {Price_Unit}</Text>
              <Text>ราคา รวม {Price_Unit*Count_Sell}</Text>
              <View style={styles.buttonsub}>
                <Button title={"submit"} onPress={() => onSubmitCart()} />
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsub: {
    margin: 10,
    width: 300,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 500,
    height: 700,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Barcode_SellGoods;

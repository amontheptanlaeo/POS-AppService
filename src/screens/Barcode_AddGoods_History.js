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
  TouchableOpacity
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "../constants/colos";
const Barcode_AddGoods_History = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [Goods_ID, setGoods_ID] = useState(null);
  const [Price, setPrice] = useState(null);
  const [Goods_Name, setGoods_Name] = useState(null);
  const [Count_Recive, setCount_Recive] = useState(null);
  const [Cost_Unit, setCost_Unit] = useState(null);
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
        console.log("เพิ่มสินค้าครั้งแรก",JSON.parse(jsonValue));
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
      url: "https://posappserver.herokuapp.com/getgoodsshop-native",
      data: {
        Branch_ID:Branch_ID,
        Goods_ID: data,
      },
    }).then((res) => {
      if(res.data==""){
        alert("ไม่มีในฐานข้อมูล")
      }else{
        setGoods_ID(data);
      setGoods_Name(res.data[0].Goods_Name);
      setModalVisible(true);
      }
      
    });

    //alert(`ชนิดบาร์โค้ด ${type} and เลขบาร์โค้ด ${data}`);
    // axios({
    //   method: "POST",
    //   url: "https://posappserver.herokuapp.com/postgoods",
    //   data: {
    //      Goods_ID : data,
    //      Count_Stock: 0,
    //      Price: 0,
    //      Goods_Name : "ชากูซ่า",
    //      Type_ID : "Branch_ID12139",
    //      Branch_ID : "Branch_ID1",
    //      Goods_img : 'http://www2.tistr.or.th/Projects/tistrbiza/images/default_product.png',
    //      Store_ID : "StoreID1",
    //      Favorite: false
    //   },
    // }).then((res)=>{
    //   alert("AddSuccess")
    // })
    //   await axios.post('https://posappserver.herokuapp.com/postbuffer-cart-sell',{
    //     Branch_ID : "Branch_ID1",
    //     ID: "11223344455563051",
    //     Store_ID : "StoreID1",
    //     Goods_ID: data,
    //     Count_Sell: "10",
    //     Price_Unit: "70",
    //     DateAdd: "2021-10-20T12.59"
    // })
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
    await axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/postbuffer-cart-recive",
      data: {
        Goods_ID: Goods_ID,
        Count_Recive: Count_Recive,
        Cost_Unit: Cost_Unit,
        ID: ID,
        Store_ID: Store_ID,
        Branch_ID:Branch_ID,
        Price: Price,
        DateAdd: dateOnAdd,
      },
    }).then((res)=>{
      alert("Success");
    })
    
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
              <Text>ชื่อสินค้า</Text>
              <TextInput
                style={styles.input}
                onChangeText={setGoods_Name}
                value={Goods_Name}
                placeholder="useless placeholder"
              />
              <Text>จำนวนที่ต้องการ</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCount_Recive}
                value={Count_Recive}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <Text>ราคาต้นทุน</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCost_Unit}
                value={Cost_Unit}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <Text>ราคาขาย</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={Price}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <View style={styles.buttonsub}>
                <TouchableOpacity style={myStyles.roundButton1}  onPress={() =>  onSubmitCart()} ><Text style={{ color: Colors.white }}>submit</Text></TouchableOpacity>
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
});

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkpurple,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marginT:{
    marginTop:30
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

export default Barcode_AddGoods_History;

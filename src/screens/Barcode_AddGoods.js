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
import DropDownPicker from "react-native-dropdown-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "../constants/colos";
function Barcode_AddGoods() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Type_ID, setType_ID] = useState(null);
  const [Goods_ID, setGoods_ID] = useState(null);
  const [Goods_Name, setGoods_Name] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
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
    const data_res=[]
    await axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getcategory",
      data: {
        Branch_ID: Branch_ID,
      },
    }).then((res) => {
      setGoods_ID(data);
      
      for(let i =0;i<(res.data).length;i++){
        data_res.push({ label: res.data[i].Type_Name, value: res.data[i].Type_ID})
      }
      setItems(data_res)
      setModalVisible(true);
    });
   
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onSubmitGoods_Shop = async () => {
    axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/postgoods",
      data: {
        Goods_ID: Goods_ID,
        Count_Stock: 0,
        Price: 0,
        Goods_Name: Goods_Name,
        Type_ID: Type_ID,
        Store_ID: Store_ID,
        Branch_ID: Branch_ID,
        Goods_img:
          "http://www2.tistr.or.th/Projects/tistrbiza/images/default_product.png",
        Favorite: false,
      },
    }).then((res) => {
      alert("AddSuccess");
    });
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
              <View style={styles.buttonsub}>
                <DropDownPicker
                  open={open}
                  value={Type_ID}
                  items={items}
                  setOpen={setOpen}
                  setValue={setType_ID}
                  setItems={setItems}
                />
              </View>
              <View style={styles.buttonsub}>
                <TouchableOpacity style={myStyles.roundButton1}  onPress={() => onSubmitGoods_Shop()} ><Text style={{ color: Colors.white }}>submit</Text></TouchableOpacity>
              </View>

              <TouchableOpacity style={myStyles.roundButton1}  onPress={() => setModalVisible(!modalVisible)} ><Text style={{ color: Colors.white }}>ปิด</Text></TouchableOpacity>
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
}

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

export default Barcode_AddGoods;

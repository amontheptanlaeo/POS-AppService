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
import DropDownPicker from "react-native-dropdown-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
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
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const data_res=[]
    await axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/getcategory",
      data: {
        Branch_ID: "20211022152900409354545223345",
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
        Store_ID: "20211022152900409354545",
        Branch_ID: "20211022152900409354545223345",
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
                <Button title={"submit"} onPress={() => onSubmitGoods_Shop()} />
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Barcode_AddGoods;
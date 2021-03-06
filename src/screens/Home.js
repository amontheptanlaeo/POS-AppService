import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colos";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue != null) {
        console.log(JSON.parse(jsonValue));
      } else {
        console.log("Not Data");
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={myStyles.container}>
      <StatusBar style="dark" />
      <View style={myStyles.circle1}></View>
      <Text style={myStyles.header}>Menu</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <View style={myStyles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("SellScreen")}>
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              source={require("../images/Icons/cash-register.png")}
            />
            <Text style={myStyles.desIcon}>ขาย</Text>
          </TouchableOpacity>
        </View>
  
        <View style={myStyles.icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Barcode_AddGoods_History")}
          >
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              source={require("../images/Icons/delivery-truck.png")}
            />
            <Text style={myStyles.desIcon}>สแกนเพิ่มแหล่งที่มา</Text>
          </TouchableOpacity>
        </View>
        <View style={myStyles.icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Barcode_AddGoods")}
          >
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              source={require("../images/Icons/hand-package.png")}
            />
            <Text style={myStyles.desIcon}>สแกนเพิ่มสินค้า</Text>
          </TouchableOpacity>
        </View>
        <View style={myStyles.icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Barcode_SellGoods")}
          >
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              source={require("../images/Icons/barcode-scanning.png")}
            />
            <Text style={myStyles.desIcon}>แสกนขาย</Text>
          </TouchableOpacity>
        </View>
        <View style={myStyles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate("AddgoodsHistoryScreen")}>
            <Image
              style={{ width: 80, height: 80, alignSelf: "center" }}
              source={require("../images/Icons/invoice.png")}
            />
            <Text style={myStyles.desIcon}>เพิ่มสินค้าลง stock</Text>
          </TouchableOpacity>
        </View>
      

      </View>

      <View style={myStyles.circle2}></View>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkpurple,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 25,
  },
  desIcon: {
    //{ color: Colors.white, fontSize: 16 }
    color: Colors.white,
    fontSize: 16,
    alignSelf: "center",
  },
  circle1: {
    position: "absolute",
    width: 369,
    height: 389,
    left: -250,
    top: -200,
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 100000,
  },
  circle2: {
    position: "absolute",
    width: 264,
    height: 278,
    left: 280,
    top: 580,
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 1000,
  },
  header: {
    fontSize: 35,
    color: Colors.white,
    marginBottom: 30,
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
    marginBottom: 20,
  },
  roundButton1: {
    width: 270,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.purple,
    marginBottom: 25,
  },
});

export default Home;

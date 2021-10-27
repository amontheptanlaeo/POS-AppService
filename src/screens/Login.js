import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colos";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#fff",
    });
  }, [navigation]);
  const storeData = async () => {
    axios({
      method: "POST",
      url: "https://posappserver.herokuapp.com/login",
      data: {
        Email: Email,
        Pass: Pass,
      },
    }).then(async (res) => {
      //console.log(res)
      if (res.data == "") {
        alert("Email หรือ Pass ผิด");
      } else {
        try {
          var value = {
            FirstName: res.data[0].FirstName,
            LastName: res.data[0].LastName,
            Branch_ID: res.data[0].Branch_ID,
            Store_ID: res.data[0].Store_ID,
            ID: res.data[0].ID,
            Store_Name:res.data[0].Store_Name,
            Branch_Name: res.data[0].Branch_Name,
            Permission_ID:res.data[0].Permission_ID,
            Approve:res.data[0].Approve
          };
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem("@storage_Key", jsonValue);
          const checkjsonValue = await AsyncStorage.getItem("@storage_Key");
          if(checkjsonValue!=null){
              await navigation.replace("Home");
          }else{
              console.log("Save ข้อมูลไม่สำเร็จ")
          }
          
        } catch (e) {
          // saving error
        }
      }
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={myStyles.container}>
        <StatusBar style="dark" />
        <Text style={myStyles.header}>เข้าสู่ระบบ</Text>
        <TextInput
          style={myStyles.input}
          placeholder="ระบุอีเมล์"
          autoCompleteType="email"
          onChangeText={(text) => setEmail(text)}
          value={Email}
        />
        <TextInput
          style={myStyles.input}
          placeholder="ระบุรหัสผ่าน"
          secureTextEntry={true}
          onChangeText={(text) => setPass(text)}
          value={Pass}
        />
        <View style={{ borderRadius: 100, width: 270 }}>
          <TouchableOpacity
            style={myStyles.roundButton1}
            onPress={async () => storeData()}
          >
            <Text style={{ color: Colors.white }}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          {/* <View
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
          >
            <Text style={{ color: Colors.white }}>ยังไม่เคยเป็นสมาชิก? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: Colors.white }}>สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View> */}
          {/* <View
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
          >
            <Text style={{ color: Colors.white }}>ลืมรหัสผ่าน? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ForgetPass")}>
              <Text style={{ color: Colors.white }}>คลิก</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    marginBottom: 20,
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

export default Login;

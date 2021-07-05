import React from 'react'
import { View, Text, StyleSheet, TextInput, Alert , Button , TouchableOpacity, TouchableWithoutFeedback  , Keyboard} from 'react-native'
import Colors from '../constants/colos'
import { 
    useFonts,
    Kanit_400Regular,
  } from '@expo-google-fonts/kanit' 

const Home = ({ navigation }) => {

     let [fontsLoaded] = useFonts({
        Kanit_400Regular
      }); 

      if(!fontsLoaded){
          return ( <View><Text>Loading</Text></View>)
      }

    return (


            <View style={myStyles.container}>
                <View style={myStyles.circle1}></View>
                <Text style={myStyles.header}>NB-POS-APP</Text>
                <View>
                    <TouchableOpacity style={myStyles.roundButton1} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: Colors.white , fontSize: 22 , fontFamily: "Kanit_400Regular"}}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={myStyles.roundButton1} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: Colors.white , fontSize: 22 , fontFamily: "Kanit_400Regular"}}>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>
                <View style={myStyles.circle2}></View>
            </View>

    )
}

const myStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkpurple,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle1: {
        position: 'absolute',
        width: 369,
        height: 389,
        left: -199,
        top: -195,
        backgroundColor: '#FFFFFF',
        borderRadius: 100000
    },
    circle2: {
        position: 'absolute',
        width: 264,
        height: 278,
        left: 280,
        top: 580,
        backgroundColor: '#FFFFFF',
        borderRadius: 1000
    },
    header: {
        fontFamily: "Kanit_400Regular",
        fontSize: 35,
        color: Colors.white,
        marginBottom: 30
    },
    input: {
        height: 35,
        borderColor: Colors.white,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        width: 270,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    roundButton1: {
        width: 270,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.purple,
        marginBottom: 25,

    }
})

export default Home

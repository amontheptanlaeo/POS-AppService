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
                <Text style={myStyles.header}>NB-POS-APP</Text>
                <View>
                    <TouchableOpacity style={myStyles.roundButton1} onPress={()=> navigation.navigate('Login')}>
                        <Text style={{ color: Colors.white , fontSize: 22 , fontFamily: "Kanit_400Regular"}}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={myStyles.roundButton1} onPress={()=> navigation.navigate('Register')}>
                        <Text style={{ color: Colors.white , fontSize: 22 , fontFamily: "Kanit_400Regular"}}>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>
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

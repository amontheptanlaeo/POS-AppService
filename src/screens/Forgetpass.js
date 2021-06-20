import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert , Button , TouchableOpacity, TouchableWithoutFeedback  , Keyboard} from 'react-native'
import Colors from '../constants/colos'

const Forgetpass = ({ navigation }) => {

    const [Email, setEmail] = useState("");

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={myStyles.container}>
            <Text style={myStyles.header}>กู้คืนรหัสผ่าน</Text>
            <TextInput
                style={myStyles.input}
                placeholder="ระบุอีเมล์ที่เคยลงทะเบียนไว้"
                autoCompleteType="email"
                onChangeText={(text) => setEmail(text)}
                value={Email}
            />
            <View style={{ borderRadius: 100, width: 270 }}>
                <TouchableOpacity style={myStyles.roundButton1}>
                    <Text style={{ color: Colors.white }}>กู้คืนรหัสผ่าน</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                    <Text style={{ color: Colors.white }}>ยังไม่เคยเป็นสมาชิก?  </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                        <Text style={{ color: Colors.white }}>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                        <Text style={{ color: Colors.white }}>เป็นสมาชิกอยู่แล้ว?  </Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                            <Text style={{ color: Colors.white }}>เข้าสู่ระบบ</Text>
                        </TouchableOpacity>
                    </View>

            </View>

        </View>


    </TouchableWithoutFeedback>

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
    fontSize: 20,
    color: Colors.white,
    marginBottom: 10
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
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.purple,

}
})


export default Forgetpass

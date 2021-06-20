import React from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button, TouchableOpacity , ScrollView , Image } from 'react-native'
import Colors from '../constants/colos'
import Coke from '../images/Coke.png'

const SeeAllItems = ({ navigation }) => {
    return (

     
                <ScrollView style={myStyles.container}>
                    <Text style={myStyles.header}>เครื่องดื่ม</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image  style={{ width:80 , height:80  , resizeMode:'cover'}}source={Coke}/>
                            <Text>20 บาท</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
    )
}


const myStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkpurple,
        flex: 1,
    },
    seeAll:{
        fontSize: 16,
        color: Colors.white,
    },
    header: {
        fontSize: 25,
        color: Colors.white,
        marginBottom: 10,
       // backgroundColor: 'pink',
        paddingLeft: 20,
        paddingTop:10,
        marginBottom: 0
    },
    Card: {
        backgroundColor: 'white',
        width: 130,
        height: 200,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        margin: 4,
        
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

export default SeeAllItems

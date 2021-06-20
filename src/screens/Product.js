import React, { useState , useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button, TouchableOpacity, ScrollView, Image, Modal, Pressable } from 'react-native'
import Colors from '../constants/colos'
import Coke from '../images/Coke.png'

const Product = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(1);

    

    return (
        <ScrollView style={myStyles.container}>

            <Text style={myStyles.header}>เครื่องดื่ม  <TouchableOpacity onPress={() => navigation.navigate('SeeItems')}><Text style={myStyles.seeAll}>ดูทั้งหมด</Text></TouchableOpacity></Text>
            <ScrollView style={myStyles.container} horizontal={true}>
                <TouchableOpacity style={myStyles.Card} onPress={() => setModalVisible(true)}>
                    <Text>โค้ก</Text>
                    <Image style={{ width: 80, height: 80, resizeMode: 'cover' }} source={Coke} />
                    <Text>20 บาท</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myStyles.Card}>
                    <Text>โค้ก</Text>
                    <Image style={{ width: 80, height: 80, resizeMode: 'cover' }} source={Coke} />
                    <Text>20 บาท</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myStyles.Card}>
                    <Text>โค้ก</Text>
                    <Image style={{ width: 80, height: 80, resizeMode: 'cover' }} source={Coke} />
                    <Text>20 บาท</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myStyles.Card}>
                    <Text>โค้ก</Text>
                    <Image style={{ width: 80, height: 80, resizeMode: 'cover' }} source={Coke} />
                    <Text>20 บาท</Text>
                </TouchableOpacity>
            </ScrollView>

            <Text style={myStyles.header}>ขนม</Text>
            <ScrollView style={myStyles.container} horizontal={true}>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
            </ScrollView>

            <Text style={myStyles.header}>อาหาร</Text>
            <ScrollView style={myStyles.container} horizontal={true}>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
            </ScrollView>


            <Text style={myStyles.header}>ของหวาน</Text>
            <ScrollView style={myStyles.container} horizontal={true}>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
                <View style={myStyles.Card}>
                    <Text>PRODUCT</Text>
                </View>
            </ScrollView>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={myStyles.centeredView}>
                    <View style={myStyles.modalView}>
                        <View style={myStyles.Card}>
                            <Text>โค้ก</Text>
                            <Image style={{ width: 80, height: 80, resizeMode: 'cover' }} source={Coke} />
                            <Text>20 บาท</Text>

                        </View>
                        <View style={{ flexDirection: 'row'  , marginBottom: 15}}>
                            <Pressable
                                style={[myStyles.button, myStyles.buttonClose]}
                                onPress={() => { count === 1 ? setCount(1) : setCount(count - 1) }}
                            >
                                <Text style={myStyles.PlusMinusStyle}>-</Text>
                            </Pressable>
                            <Text style={{ borderColor: 'black', width: 80, marginHorizontal: 10, alignSelf: 'center', textAlign: 'center', borderWidth: 0, height: 30, padding: 5 }}>{count}</Text>
                            <Pressable
                                style={[myStyles.button, myStyles.buttonClose]}
                                onPress={() => setCount(count + 1)}
                            >
                                <Text style={myStyles.PlusMinusStyle}>+</Text>
                            </Pressable>
                        </View>

                        <Pressable
                            style={[myStyles.button, myStyles.buttonClose]}
                            onPress={() => { 
                                setModalVisible(!modalVisible)
                                setCount(1)
                             }}
                        >
                            <Text style={myStyles.textStyle}>ปิด</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </ScrollView>

    )
}


const myStyles = StyleSheet.create({


    //

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonClose: {
        backgroundColor: Colors.purple,
    },
    textStyle: {
        width: 100,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    PlusMinusStyle: {
        width: 11,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:14
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    //


    container: {
        backgroundColor: Colors.darkpurple,
        flex: 1,
    },
    seeAll: {
        fontSize: 16,
        color: Colors.white,
    },
    header: {
        fontSize: 25,
        color: Colors.white,
        marginBottom: 10,
        // backgroundColor: 'pink',
        paddingLeft: 20,
        paddingTop: 10,
        marginBottom: 0
    },
    Card: {
        backgroundColor: 'white',
        width: 130,
        height: 200,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,

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


export default Product

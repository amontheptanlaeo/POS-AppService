/* import { createAppContainer} from 'react-navigation' */
import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack' 
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text , TouchableOpacity , Dimensions} from 'react-native'


import LoginScreen from './src/screens/Login'
import ScannerScreen from './src/screens/Scanner'
import RegisterScreen from './src/screens/Register'
import SettingScreen from './src/screens/Setting'
import ForgetScreen from './src/screens/Forgetpass'
import HomeScreen from './src/screens/Home'
import ProductScreen from './src/screens/Product'
import SeeItemScreen from './src/screens/SeeAllItems'
import Colors from './src/constants/colos'
import Barcode_AddGoods_History from './src/screens/Barcode_AddGoods_History';
import Barcode_AddGoods from './src/screens/Barcode_AddGoods';
import Barcode_SellGoods from './src/screens/Barcode_SellGoods';
import SellScreen from './src/screens/SellScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomBarcodeIcon = ({children , onPress}) => (

  <TouchableOpacity style={{
    top: -20,
    justifyContent:'center',
    alignItems:'center',

  }}
  onPress={onPress}
  >
    <View style={{
      width:90,
      height:70,
      borderRadius:25,
      backgroundColor: Colors.purple,
      shadowColor:'#7F5DF0',
      shadowOffset: {
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5,  
    }}>
      {children}
    </View>
  </TouchableOpacity>

)


function HomeStack({navigation}) {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.darkpurple,
          labelStyle: { fontSize:14  , fontWeight:'bold'},
          style: {
            position:'absolute',
            height: 60,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            elevation: 0,
            borderTopColor: Colors.purple,
            borderLeftColor: Colors.purple,
            borderRightColor: Colors.purple,
            borderTopWidth:5,
            borderLeftWidth:3,
            borderRightWidth:3,
            backgroundColor:'#ffffff',
          }
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="home" size={focused ? 30:24} color={focused? Colors.darkpurple :"black"} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Scanner"
          options={{
            title:'',
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name="barcode-scan" size={36}  style={{ position:'absolute' , top:16}} color={focused? "white":"black"} />
              ),
            tabBarButton: (props) => (
              <CustomBarcodeIcon {...props}/>
            )
            
          }}
          component={Barcode_SellGoods}
        />
        <Tab.Screen
          name="Setting"
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="setting" size={focused ? 30:24} color={focused? Colors.darkpurple :"black"} />
            ),
          }}
          component={SettingScreen}
        />
      </Tab.Navigator>
  );
}

const globalScreenOption = {
  headerStyle: { backgroundColor: Colors.darkpurple},
  headerTitleStyle: { color: "white"},
  headerTintColor:  "#fff",
  headerTitleAlign: "center",
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOption}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Product" component={ProductScreen}/>
        <Stack.Screen name="Barcode_AddGoods_History" component={Barcode_AddGoods_History}/>
        <Stack.Screen name="Barcode_AddGoods" component={Barcode_AddGoods}/>
        <Stack.Screen name="Barcode_SellGoods" component={Barcode_SellGoods}/>
        <Stack.Screen name="SellScreen" component={SellScreen}/>
         <Stack.Screen name="Home" options={{

           title:'NB-POS-SYSTEM',

           }}component={HomeStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  )


}

export default App
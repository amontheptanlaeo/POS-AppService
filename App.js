/* import { createAppContainer} from 'react-navigation' */
import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack' 
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import LoginScreen from './src/screens/Login'
import ScannerScreen from './src/screens/Scanner'
import RegisterScreen from './src/screens/Register'
import SettingScreen from './src/screens/Setting'
import ForgetScreen from './src/screens/Forgetpass'
import HomeScreen from './src/screens/Home'
import ProductScreen from './src/screens/Product'
import SeeItemScreen from './src/screens/SeeAllItems'
import Colors from './src/constants/colos'
import { color } from 'react-native-elements/dist/helpers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* const navigator = createStackNavigator (
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    ForgetPass: ForgetScreen,
    Product: ProductScreen,
    SeeItems: SeeItemScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      //title: 'NB-POS-APP' ,
      headerStyle: {
        backgroundColor: Colors.darkpurple,
      },
      headerTitleStyle:{
        fontSize: 22,
        color: Colors.white,
      },
      headerTitleAlign: 'center',
    },
    
    
  }
)

export default createAppContainer(navigator) */


function HomeStack({navigation}) {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.darkpurple,
          labelStyle: { fontSize:14  , fontWeight:'bold'},
          tabStyle: { backgroundColor:'white' , borderTopWidth: 3 , borderTopColor: Colors.purple }
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Scanner"
          style={{backgroundColor:'red'}}
          options={{
  
            tabBarIcon: () => (
              <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
            ),
            
          }}
          component={ScannerScreen}
        />
        <Tab.Screen
          name="Setting"
          options={{
            tabBarIcon: () => (
              <AntDesign name="setting" size={24} color="black" />
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
         <Stack.Screen name="Home" options={{

           title:'NB-POS-SYSTEM',

           }}component={HomeStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  )


}

export default App

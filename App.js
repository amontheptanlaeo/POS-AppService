import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './src/screens/Login'
import RegisterScreen from './src/screens/Register'
import ForgetScreen from './src/screens/Forgetpass'
import HomeScreen from './src/screens/Home'
import ProductScreen from './src/screens/Product'
import SeeItemScreen from './src/screens/SeeAllItems'
import Colors from './src/constants/colos'


const navigator = createStackNavigator (
  {
    Home: HomeScreenn,
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

export default createAppContainer(navigator)

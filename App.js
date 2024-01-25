import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Welcomme from './screens/Welcomme';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import ButtomTap from './components/ButtomTap';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Details from './screens/Details';
import EditProfile from './screens/EditProfile';
import Updatepassword from './screens/Updatepassword';
import SearchScreen from './screens/SearchScreen';
import Favorite from './screens/Favorite';
const Mycompenet =({SetActive})=>{
  const navigation =useNavigation()
  useEffect(()=>{
  const unactive = navigation.addListener('state',()=>{
    const currentScreen = navigation.getCurrentRoute().name
    SetActive(currentScreen)
  })
return unactive
  },[navigation])
}
export default function App() {
  const[Active,SetActive]=useState('')
  //--------------fonction for using fonts:
  const [fontloaded]=useFonts({
    InterBold: require('./assets/font/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/font/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/font/Inter-Medium.ttf'),
    InterRegular: require('./assets/font/Inter-Regular.ttf'),
    InterLight: require('./assets/font/Inter-Light.ttf'),
  })
  // navigation:
  const Stack=createNativeStackNavigator();
  if(!fontloaded) return null;
  return (
    <>
    <StatusBar style="auto" animated={true} />
    <NavigationContainer>
    <Mycompenet SetActive={SetActive}/>
    <Stack.Navigator
    // initialRouteName='Welcome'
    screenOptions={{headerShown:false}}>
      <Stack.Screen name="Welcomme" component={Welcomme} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen}/>
      <Stack.Screen name='Search' component={SearchScreen}/>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='Settings' component={Settings}/>
      <Stack.Screen name='Details' component={Details}/>
      <Stack.Screen name='Profile' component={EditProfile}/>
      <Stack.Screen name='Updatepassword' component={Updatepassword}/>
      <Stack.Screen name='Favorite' component={Favorite}/>

    </Stack.Navigator>
    {Active !== "Welcomme" && Active !=="Login"  && Active !=="Register"  && Active !=="Details" && Active !=="Profile"  && Active !=="Updatepassword" ?(
      <ButtomTap Active={Active}  />
    ):<></>}
  </NavigationContainer>
  </>
  );
}



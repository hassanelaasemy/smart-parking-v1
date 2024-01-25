import { View, Text, TouchableOpacity, SafeAreaView ,StyleSheet, DrawerLayoutAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ButtomTap = ({ Active }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // check the user is logged in or not:
  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then((accessToken) => {
        if (accessToken !== null) {
          // If 'accessToken' exists, set 'isLoggedIn' to true
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
  }, []); // This effect runs only once after the component mounts
  return (
    <SafeAreaView style={Styles.continer}>
      <View style={Styles.ButtomTap}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="menu" size={25} 
            color={Active === "Settings" ? "#49DFEA" : "#5C5576"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <FontAwesome5 name="search" size={25} color={Active === "Search" ? "#49DFEA" : "#5C5576"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5 name="map-marked-alt" size={25} color={Active === "Home" ? "#49DFEA" : "#5C5576"} />
        </TouchableOpacity>
        <TouchableOpacity
      onPress={() => {
        isLoggedIn ? navigation.navigate('Profile') : navigation.navigate('Login');
      }}
    >
      <FontAwesome
        name={isLoggedIn ? 'user' : 'user-plus'}
        size={25}
        color={Active === 'Login' ? '#49DFEA' : '#5C5576'}
      />
    </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  continer:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 1,
  },
  ButtomTap:{
    backgroundColor: 'white',
    // borderRadius: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  }
})
export default ButtomTap;

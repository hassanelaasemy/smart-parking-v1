import { View, Text ,Image, Animated, SafeAreaView, TouchableOpacity,StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState} from 'react'
import { Picker } from '@react-native-picker/picker';


// --import image:
import image1 from "../assets/imagesI/image1.jpeg";
import image3 from "../assets/imagesI/image3.jpeg";
import image4 from "../assets/imagesI/image4.png";

// ---import font ,sizes , colors :
import {SIZES,COLORS,FONTS} from '../constants'  


// --navigation:
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// -------------------------------import translation :
import  '../utils/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Welcomme = () => {
    //------------------------------go to the home page:
    const navigation =useNavigation();
    const presshandler=()=>{
        navigation.navigate('Home')
    }

//------------------------------------animation picture:
const duration = 1000;
const delay = duration + 300;
const fadeImageAnimation = useRef(new Animated.Value(0)).current;
const moveImageAnimation=useRef(new Animated.ValueXY({x:100,y:100})).current;
const animationimagehandler =()=>{
    Animated.sequence([
        Animated.timing(fadeImageAnimation,{
            toValue:1,
            duration,
            useNativeDriver:true
        }),
    Animated.spring(moveImageAnimation,{
        toValue:{x:0,y:0},
        duration,
        useNativeDriver:true
    })
    ]).start();
}

//------------------------------------animation text:
const fadetextanimation = useRef(new Animated.Value(0)).current;
const movebuttonAnimation=useRef(new Animated.Value(1)).current;
const animationtexthandler =()=>{
        Animated.timing(fadetextanimation,{
            toValue:1,
            duration,
            delay,
            useNativeDriver:true
        }).start();

}

//------------------------------------animation button:
const animationbuttonhandler =()=>{
    Animated.spring(movebuttonAnimation,{
        toValue: 0,
        friction: 4,
        delay,
        useNativeDriver: true,
    }).start();

}
// ------------------useEffect for animation
useEffect(()=>{
    animationimagehandler();
    animationtexthandler();
    animationbuttonhandler()
},[animationimagehandler,animationtexthandler,animationbuttonhandler])


// ----------------------------------function for translation language:
const { t, i18n } = useTranslation();
const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
const changeLanguage = async (language) => {
  setSelectedLanguage(language);
  i18n.changeLanguage(language); // Update the language
  await AsyncStorage.setItem('selectedLanguage', language);
};

  // Retrieve selected language
const getSelectedLanguage = async () => {
const language = await AsyncStorage.getItem('selectedLanguage');
  setSelectedLanguage(language || i18n.language);
  changeLanguage(language);
};

useEffect(() => {
  getSelectedLanguage();     // Get the selected language from storage or use default 'fr' for new users
  // Add a listener for language changes
  const languageChangeHandler = (newLanguage) => {
    // Update the selected language state when the language changes
    setSelectedLanguage(newLanguage);
  };
  // Subscribe to the 'languageChanged' event
  i18n.on('languageChanged', languageChangeHandler);
  // Clean up the listener when the component unmounts
  return () => {
     // Unsubscribe from the 'languageChanged' event to prevent memory leaks
    i18n.off('languageChanged', languageChangeHandler);
  };
}, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light'/>

      {/* -------------------Select languages  */}
      <View style={styles.pickerContainer}>
        <Picker
    
    selectedValue={selectedLanguage}
    onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}
    style={[styles.picker,{color:'white'}]}
    dropdownIconColor={"white"}
  >
    <Picker.Item label={t('English')} value="en" />
    <Picker.Item label={t('العربية')} value="ar" />
    <Picker.Item label={t('Français')} value="fr" />
        </Picker>
    </View>

      {/* ---------------------------image container: */}
      <Animated.View style={[styles.imagecontainer,{
        opacity:fadeImageAnimation,
        transform:moveImageAnimation.getTranslateTransform(),

      }]}>
        <View style={styles.imagecard}>
            <Image style={styles.image}
            source={image1}
            />
        </View>
        <View style={[styles.imagecard,{top:SIZES.medium+15}]}>
            <Image style={styles.image}
            source={image4}
            />
        </View>
        <View style={styles.imagecard}>
            <Image style={styles.image}
            source={image3}
            />
        </View>
      </Animated.View>

      {/* ---------------------------Text container: */}
      <Animated.View style={[styles.text,{
        opacity:fadetextanimation,
      }]}>
        <Text style={styles.mainText} >
            {t('Trouvez Votre Parking Sécurisé')}
        
        </Text>
        <Text style={styles.subtext} >
            {t('Partout Au Maroc')}        
        </Text>
      </Animated.View>

      {/* ---------------------------button container: */}
      <Animated.View style={[
          styles.buttonContainer,
          {
            transform: [
              {
                translateY: movebuttonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          },
        ]}>
         <TouchableOpacity
         onPress={presshandler}
         style={styles.button}
         >
            <Text
            style={styles.textButton}
            >
                {t('Commencer')}
            </Text>
         </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

export default Welcomme

const styles= StyleSheet.create({
container:{
    paddingHorizontal:SIZES.small +10,
    alignItems : 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor:COLORS.bg, 
    
},
imagecontainer:{
    top:-SIZES.medium,
    flexDirection:'row',
    gap:SIZES.small
},
image:{
    width:200,
    height:200,
    borderRadius:SIZES.medium
},
imagecard:{
    padding:SIZES.medium,
    borderRadius:SIZES.medium,
    backgroundColor:COLORS.cardBg
},
text:{
    margin:SIZES.small,
    padding:SIZES.small,
    marginVertical:SIZES.xLarge+6
},
mainText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    textAlign: "center",
    color: COLORS.white,
  },
  subtext: {
    fontFamily: FONTS.light,
    textAlign: "center",
    marginTop: SIZES.large,
    color: COLORS.gray,
  },
  buttonContainer: {
    position: "absolute",
    bottom: SIZES.xLarge + 10,
    marginVertical: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.second,
    padding: SIZES.small + 4,
    width: 240,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  textButton: {
    color: COLORS.white,
    fontFamily:FONTS.bold,
    fontSize: SIZES.large,
  },
  pickerContainer: {
    marginTop: 20,
    borderColor: COLORS.gray,
    overflow: 'hidden',
    backgroundColor: COLORS.bg,
    width: 200,
    paddingLeft:50,
    alignSelf: 'center',
  },
  picker: {
 
    height: 50,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  }
  


})
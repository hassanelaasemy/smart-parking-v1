import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import { useTheme } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, COLORSI, FONTSI, SIZES, SIZESI } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import CustomInput from './CustomInput';
import Button from './Button';
const LoginModel = (props) => {
    const {colors} = useTheme();
  return (
    <>
    <View
        style={{
            backgroundColor:colors.card,
            maxWidth:330,
            width:'100%',
            borderRadius:SIZESI.radius,
            paddingHorizontal:10,
            paddingVertical:10,
        }}
    >
        <View style={{
            paddingHorizontal:15,
            borderBottomWidth:1,
            borderColor:colors.borderColor,
            paddingVertical:6,
            marginBottom:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        }}>
            <Text style={{...FONTSI.h5,color:colors.title}}>Sign In</Text>
            <TouchableOpacity style={{padding:10}} onPress={() => props.close(false)}>
                <FeatherIcon name={'x'} size={24} color={colors.title}/>
            </TouchableOpacity>
        </View>
        <View style={GlobalStyleSheet.container}>
            <View style={{marginBottom:15}}>
                <CustomInput
                    icon={<FontAwesome name={'user'} size={20} color={colors.textLight}/> }
                    value={''}    
                    placeholder={'Name'}
                    onChangeText={(value)=> console.log(value)}
                />
            </View>
            <View style={{marginBottom:15}}>
                <CustomInput
                    icon={<FontAwesome name={'lock'} size={20} color={colors.textLight}/> }
                    value={''}    
                    type={'password'}
                    placeholder={'Password'}
                    onChangeText={(value)=> console.log(value)}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,marginTop:10}}>
                <TouchableOpacity>
                    <Text style={{...FONTSI.font,color:COLORSI.primary}}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{...FONTSI.font,color:COLORSI.primary}}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <Button title={'Login'}/>
        </View>
    </View>
</>
  )
}

export default LoginModel
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { FlatList, Image, SafeAreaView, ScrollView, Text,TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS , FONTS, IMAGES, SIZES } from '../constants/theme';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import '../utils/i18n';
import { t } from 'i18next';
const ServicesParking = ({ id }) => {
  const theme = useTheme();
  const [park, setPark] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getServicesParkByid();
  }, []);
  getServicesParkByid = () => {
    axios
      .get(`http://192.168.1.16:8080/v2/parking/byid/${id}/services`)
      .then((resopnse) => {
        setOptions(resopnse.data.options)
        setPark(resopnse.data);
        setLoading(false);
      })
      .catch((err) => {
      });
  };
  const renderItem = ({item}) => {
    return(
        <View
            style={{
                marginRight:10,
                width:120,
                backgroundColor:COLORS.light,
                borderRadius:5
            }}    
        >
            <TouchableOpacity
                onPress={() => console.log("yes")}
                style={{
                    paddingHorizontal:15,
                    paddingVertical:15,
                    backgroundColor:item.color,
                    borderRadius:15,
                    marginBottom:10,
                    flex:1,
                }}
            >
                <View
                 style={{
                  height:24,
                  width:24,
                  marginBottom:12,
                  marginTop:5,
              }}
                >
                <MaterialIcons name={`${item.icon}`} size={24} color={COLORS.second}  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{fontFamily: FONTS.light,
              fontSize: SIZES.medium}}>{item.name}</Text>
              {/* <Text style={{fontFamily: FONTS.light,
              fontSize: SIZES.medium,}}>
                {item.price}dh
              </Text> */}
                </View>
                
            </TouchableOpacity>

        </View>
    )
}
  return (
    <SafeAreaView style={{backgroundColor:COLORS.white,paddingTop:15}}>      
      <View style={[GlobalStyleSheet.container,{padding:0}]}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={{fontFamily: FONTS.semiBold,
              fontSize: SIZES.large}}>
                {t('Services')}
              </Text>
               <TouchableOpacity>
                  <Text style={{...FONTS.font,color:COLORS.second}}>
                    {t("Voir tout")}
                  </Text>
              </TouchableOpacity>
          </View>
      </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingLeft:0,paddingBottom:10,paddingTop:12}}
                  data={options}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
              />
              
    </ScrollView>
  </SafeAreaView>
  )
}

export default ServicesParking
import { View, Text ,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import  '../utils/i18n';
import { t } from 'i18next';
const AboutParking = ({ id , street, address, description }) => {
  console.log(description);
  return (
    <>
    <View style={{flexDirection: 'row', marginTop: 10 }}>
      <Icon name="place" size={28} color={COLORS.second} />
      <Text
        style={{
          marginLeft: 5,
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.black,
        }}>
          {address} {street} 
      </Text>
    </View>
    <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
    {t('À propos du Parking')}
    </Text>
    {/*------------------description: */}
       <Text style={{marginTop: 10, lineHeight: 20}}>
    {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur sunt autem illo consequuntur corrupti, officiis laborum ut repudiandae alias tempora porro quis ab nostrum dicta voluptas eveniet? Consequatur fugiat eligendi, possimus soluta, enim earum est voluptatibus odio ut, labore laudantium.
    </Text> 
   
</>
  )
}
export default AboutParking

const styles = StyleSheet.create({
  scrollView: {
  },
})
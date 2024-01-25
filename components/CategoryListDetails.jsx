import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryListDetails = ({ setPanel ,  setReviews}) => {
  const [position,setPosition]=useState("About") 

  return (
    <View style={styles.categoryContainer}>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setPanel("About");
              setReviews(false);
              setPosition("About")
          }}
        >
          <View style={styles.categoryItem}>
            <Icon
              name={"info-circle"}
              size={15}
              style={position==="About"? styles.categoryTextSelected : styles.categoryText}
              />
            <Text style={position==="About"? styles.categoryTextSelected : styles.categoryText}  >
              About
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setPanel("Services");
              setReviews(false);
              setPosition("Services")
          }}
        >
          <View style={styles.categoryItem}>
            <Icon
              name={"cogs"}
              size={15}
              style={position==="Services"? styles.categoryTextSelected : styles.categoryText}
              />
            <Text
                          style={position==="Services"? styles.categoryTextSelected : styles.categoryText}
            >
              Services
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setPanel("Media");
              setReviews(false);
              setPosition("Media")
          }}
        >
          <View style={styles.categoryItem}>
            <Icon
              name={"photo"}
              size={15}
              style={position==="Media"? styles.categoryTextSelected : styles.categoryText}
              />
            <Text style={position==="Media"? styles.categoryTextSelected : styles.categoryText}    >
              Media
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setReviews(true);
          }}
        >
          <View style={styles.categoryItem}>
            <Icon
              name={"star"}
              size={15}
              style={styles.categoryText}
              />
            <Text
              style={[
                styles.categoryText,
              ]}
            >
              Reviews
            </Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};
const styles = {
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  categoryText: { 
    fontSize: 15, 
    color: "gray",           
    fontWeight: 'bold' ,
    marginLeft: 5, },
  categoryTextSelected: {
    color: COLORS.second,
    fontSize: 15, 
    fontWeight: 'bold' ,
    marginLeft: 5,
    paddingBottom: 5,
  },

};

export default CategoryListDetails;

import { ActivityIndicator } from "react-native";
import { View, Text, StyleSheet, Image ,ScrollView , } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import profile from "../assets/imagesI/profile.jpeg";
import "../utils/i18n";
import { t } from "i18next";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardStyle8 from "../components/CardSearch";
import CategoryListSearch from "../components/SearchList";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ["POPULAR", "ORGANIC", "INDOORS", "SYNTHETIC"];
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Parking, setParking] = useState([]);
  
  useEffect(() => {
    getParking();
  }, []);

  const getParking = () => {
    const parkingdata = {
      metaData: {},
      listParking: {
        country: "MAROC",
        city: "Casablanca",
      },
      timeStamps: Date.now(),
    };

    AsyncStorage.getItem("accessToken")
    .then((accees) => {
      axios
      .post("http://192.168.1.16:8080/v2/parking/byCity", parkingdata , 
      {
        headers: {
          Authorization: `Bearer ${accees ? accees : ""}`,
        },
      })
      .then((response) => {
        setParking(response.data);
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
        setReload(true);
      })
      .finally(() => {
        setLoading(false);
      });
    })
    .catch();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{t("Trouver un parking")}</Text>
        <Image source={profile} style={styles.profileImage} />
      </View>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder={t("Cherche ici...")}
            style={styles.input}
            clearButtonMode="always"
            autoCorrect={false}
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.black} />
        </View>
      </View>
      <CategoryListSearch
        categories={categories}
        catergoryIndex={catergoryIndex}
        setCategoryIndex={setCategoryIndex}
      />
      <ScrollView contentContainerStyle={{paddingBottom:80}}
      showsVerticalScrollIndicator={false}
      >
        <View style={GlobalStyleSheet.container}>
        
        {loading ?(
              <ActivityIndicator
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              size="large"
              color={COLORS.primary}
            />
        ):(
           <View
          style={{
            marginHorizontal: -20,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {Parking.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "50%",
                  paddingHorizontal: 8,
                }}
              >
                
                <CardStyle8
                  id={data.id}
                  image={data.image}
                  title={data.name}
                  price={data.price}
                  address={data.address}
                  navigate={"ItemDetails"}
                  rating={data.rating}
                  favorite={data.favorite}
                />
              </View>
            );
          })}
        </View>  
        )}
       
      </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.black,
  },
  sortBtn: {
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.second,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

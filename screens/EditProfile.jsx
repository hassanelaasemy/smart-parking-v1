import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
//----------------------import image:
import profile from "../assets/imagesI/user.png";
// -------------------------------translation :
import "../utils/i18n";
import { t } from "i18next";
//-------------------------------------import theme:
import { FONTS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const EditProfile = ({ navigation }) => {
  const TostMessage = () => {
    ToastAndroid.show("Edited Sucessfully !", ToastAndroid.SHORT);
  };
  const [userInfo, setuserInfo] = useState("");
  const getUserDetails = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get("http://192.168.1.16:8080/v1/user/info", {
            headers: {
              Authorization: "Bearer " + accees,
            },
          })
          .then((response) => {
            setuserInfo(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      {/*----------------------header: */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          top: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" size={35} color={"#49DFEA"} />
        </TouchableOpacity>
        <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }}>
          {t("Editer le profil")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            TostMessage();
            navigation.goBack();
          }}
        >
          <Ionic name="checkmark" size={35} color={"#49DFEA"} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, alignItems: "center", top: 40 }}>
        <Image
          source={userInfo.avatar ? { uri: userInfo.avatar } : profile}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
        <Text style={{ color: "#3493D9", top: 5 }}>
          {t("Change profile photo")}
        </Text>
      </View>
      <View style={{ padding: 10, paddingVertical: 20, top: 30 }}>
        {/*----------------------inputs: */}
        <View style={{ paddingVertical: 12 }}>
          <Text style={{ color: "#3493D9" }}>{t("Nom")}</Text>
          <TextInput
            placeholder={t("votre nom")}
            defaultValue={userInfo.firstName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            {t("Prénom")}
          </Text>
          <TextInput
            placeholder={t("votre prenom")}
            defaultValue={userInfo.lastName}
            style={{
              fontSize: 14,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            {t("Email")}
          </Text>
          <TextInput
            placeholder={t("votre email")}
            defaultValue={userInfo.username}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        {/* <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            {t("Numéro de téléphone")}
          </Text>
          <TextInput
            placeholder={t("votre téléphone")}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View> */}
      </View>
      <View>
        {/* <Text
          style={{
            marginVertical: 10,
            padding: 10,
            color: '#3493D9',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
          }}>
          Switch to Professional account
        </Text> */}
        {/*----------------------------button: */}
        <TouchableOpacity onPress={() => navigation.navigate("Updatepassword")}>
          <Text
            style={{
              marginVertical: 10,
              padding: 10,
              color: "#3493D9",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#EFEFEF",
              fontSize: 16,
            }}
          >
            {t("Confidentialité")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

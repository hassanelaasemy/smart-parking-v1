import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
//------------------------import the theme:
import { COLORS, FONTS, SIZES } from "../constants";
// -------------------------------translation :
import "../utils/i18n";
import { t } from "i18next";
import i18n from "../utils/i18n";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  //----valid inputs
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  
  //------------------------state for inputs:
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //---------------------Show and hide password:
  const [issecure, Setissecure] = useState(true);
  const toggleSecureTextEntry = () => {
    Setissecure(!issecure);
  };
  //------------------------navigation:
  const navigation = useNavigation();
  //--------------Handle login logic here
  const handleLogin = () => {
    setLoading(true);
    const loginrequest = {
      metaData: {},
      login: {
        email: username,
        password: password,
      },
      timeStamps: new Date(),
    };
    axios
      .post("http://192.168.1.16:8080/v1/auth/login", loginrequest)
      .then(async (response) => {
        if (response.status === 200) {
          console.log("User logged in successfully");
        }
        AsyncStorage.setItem("accessToken", response.data.accessToken);
        AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate("Home");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* header: */}
      <View style={styles.iconContainer}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
      </View>
      <View style={styles.centerContainer}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>{t("Connectez-vous")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("votre adresse e-mail")}
          value={username}
          onChangeText={setUsername}
        />
        <View style={{ width: "100%" }}>
          <TextInput
            style={[
              styles.input,
              i18n.language === "ar" && { textAlign: "right" },
            ]}
            placeholder={t("votre mot de passe")}
            secureTextEntry={issecure}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          <TouchableOpacity
            onPress={toggleSecureTextEntry}
            style={[{ position: "absolute", right: 10, top: 10 }]}
          >
            <Icon
              name={issecure ? "eye-slash" : "eye"}
              size={20}
              color="gray"
              style={{
                ...(i18n.language === "ar" && {
                  position: "absolute",
                  right: 310,
                  top: -1,
                }),
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>{t("Mot de passe oublié?")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            i18n.language === "en" && { paddingHorizontal: 150 },
          ]}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>{t("se connecter")}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>{t("S'inscrire")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  iconContainer: {
    alignSelf: "flex-start",
    marginTop: 20,
    top: 25,
  },
  backIcon: {
    paddingHorizontal: 10,
    marginLeft: -12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Added to center align the input fields
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
  },
  button: {
    backgroundColor: "#49DFEA",
    paddingVertical: 8,
    paddingHorizontal: 130,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  forgotButton: {
    marginBottom: 10,
  },
  forgotText: {
    color: "#007bff",
    fontSize: 15,
    paddingLeft: 190,
  },
  registerButton: {
    padding: 10,
  },
  registerText: {
    fontSize: SIZES.large,
    color: COLORS.second,
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xLarge,
    marginBottom: 10,
    color: COLORS.black,
  },
});

export default LoginScreen;

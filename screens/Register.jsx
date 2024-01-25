import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
//------------------------import the theme:
import { COLORS, FONTS, SIZES } from "../constants";
// -------------------------------translation :
import "../utils/i18n";
import { t } from "i18next";
import i18n from "../utils/i18n";
import axios from "axios";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [newfirstName, setnewfirstName] = useState("");
  const [newlastName, setnewlastName] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [loading, setLoading] = useState(false);
  //----------------------------Show and hide password:
  const [issecure, Setissecure] = useState(true);
  const toggleSecureTextEntry = () => {
    Setissecure(!issecure);
  };
  //-----------------------------validation input:
  const [nameError, setNameError] = useState("");
  const [lastnameError, selastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateName = (name) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };
  const validateLastName = (name) => {
    if (!name) {
      selastnameError("Name is required");
      return false;
    }
    selastnameError("");
    return true;
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };
  //-----------------Handle registration logic here
  const handleRegister = () => {
    setLoading(true);
    const isNameValid = validateName(newfirstName);
    const isLastnameValid= validateLastName(newlastName)
    const isEmailValid = validateEmail(newemail);
    const isPasswordValid = validatePassword(newpassword)
    if (isNameValid && isEmailValid && isPasswordValid && isLastnameValid){
       axios
      .post("http://192.168.1.16:8080/v1/auth/register", {
        metaData: {},
        register: {
          firstName: newfirstName,
          lastName: newlastName,
          email: newemail,
          password: newpassword,
        },
        timeStamps: new Date(),
      })
      .then((response) => {
        console.log(new Date());
        handleLogin();
        if (response.status === 201) {
          console.log("User registered successfully");
        }
      })
      .catch((error) => {
        if (error.response) {
          setRegistrationError(error.response.data.message);
        } else {
          setRegistrationError("Registration failed. Please try again.");
        }
        setLoading(true);
      });
    }else{
      setLoading(false);
    }
   
  };
  const handleLogin = () => {
    const loginrequest = {
      metaData: {},
      login: {
        email: newemail,
        password: newpassword,
      },
      timeStamps: new Date(),
    };
    axios
      .post("http://192.168.1.16:8080/v1/auth/login", loginrequest)
      .then(async (response) => {
        if (response.status === 200) {
          console.log("User logged in successfully");
        }
        console.log(response.data);
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate("Home");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icons/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>{t("Créez votre compte")}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("Nom")}
            onChangeText={(text) => {
              setnewfirstName(text);
              setNameError("");
            }}
          />
          { nameError ? <Text style={styles.error}>{nameError}</Text> : null }
          <TextInput
            style={styles.input}
            placeholder={t("Prénom")}
            onChangeText={(text) => {
              setnewlastName(text);
              selastnameError("");
            }}
          />
          { lastnameError ? <Text style={styles.error}>{lastnameError}</Text> : null }
          <TextInput
            style={styles.input}
            placeholder={t("Email")}
            onChangeText={(text) => {
              setnewemail(text);
              setEmailError("");
            }}
          />
          { emailError ? <Text style={styles.error}>{emailError}</Text> : null }
          <View style={{ width: "100%" }}>
            <TextInput
              style={[
                styles.input,
                i18n.language === "ar" && { textAlign: "right" },
              ]}
              placeholder={t("Mot de passe")}
              secureTextEntry={issecure}
              onChangeText={(text) => {
                setnewpassword(text);
                setPasswordError("");
              }}
            />
             { passwordError ? <Text style={styles.error}>{passwordError}</Text> : null }
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
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>{t("S'inscrire")}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginText}>
            {t("Vous avez déjà un compte? Connectez-vous")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 33,
    top: 25,
  },
  content: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#49DFEA",
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.xLarge,
    marginBottom: 10,
    color: COLORS.black,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: "#007bff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default RegisterScreen;

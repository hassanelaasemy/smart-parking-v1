import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, Text, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import profile from "../assets/imagesI/profile.jpeg";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { COLORS, FONTS, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";
import marker from "../assets/icons/marker.png";
import axios from "axios";
import '../utils/i18n';
import { t } from 'i18next';
const Home = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [isPermission, setIsPermission] = useState(false);
  const [data, setData] = useState();
  const [parking, setParking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    checkLocation().then((res) =>{
       setLocation({coords : {latitude : res.latitude , longitude : res.longitude}});
       setData({country : res.countryName , city : res.cityName});
      }).catch((error) => console.log(error));
    getCurrentLocation().then((res) => {
      setIsPermission(true);
      setCurrentLocation({coords : {latitude : res.coords.latitude, longitude : res.coords.longitude}});
    }).catch((error) => {setIsPermission(false) ;  setCurrentLocation({ coords : { latitude :  0 , longitude : 0} })})
    getParking(setData , setLocation);
  }, [setData , setLocation , setCurrentLocation]);


  const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const data =  await Location.getCurrentPositionAsync({});
      return data;
  }
  const checkLocation = async () => {
    let { latitude , longitude , countryName , city} = (await axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client")).data;
    return {
      latitude,
      longitude,
      countryName,
      city
    }
  };

  const getParking = () => {
    setLoading(true);
    const parkingdata =   {
        metaData : {},
        listParking : {
            country:"MAROC",
            city:"San Francisco"
        },
        timeStamps : Date.now()
    }
    axios
      .post("http://localhost:3000/casablanca",parkingdata)
      .then((response) => {
        // setParking(response.data);
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
        setReload(true);
      })
      .finally(() => {
        setReload(true);
        setLoading(false);
      });
  };

 
  const handleCloseCard = () => {
    setSelectedParking(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{t('Accueil')}</Text>
        <Image source={profile} style={styles.profileImage} />
      </View> 
      {loading ? (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      ) : (
        currentLocation && location &&
        <MapView
          style={styles.map}
          initialRegion={{
                latitude: isPermission ? currentLocation?.coords.latitude : location.coords.latitude,
                longitude: isPermission ? currentLocation?.coords.longitude : location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
          maxZoomLevel={150}
          onPress={handleCloseCard}
        >
          {parking.map((parkingLocation) => (
            <Marker
              key={parkingLocation.id}
              coordinate={{
                latitude: parseFloat(parkingLocation.lat),
                longitude: parseFloat(parkingLocation.lng),
              }}
              image={marker}
              onPress={() => setSelectedParking(parkingLocation)}
            />
          ))}
        </MapView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedParking}
        onRequestClose={() => {
          setSelectedParking(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedParking && (
              <ParkingCard
                title={selectedParking.name}
                description={selectedParking.description}
                imageSource={selectedParking.image.filter(image => image.default === true).map(image => image.url)[0]}
              />
            )}
            <TouchableOpacity
              onPress={handleCloseCard}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
    marginTop: 25,
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
  map: {
    flex: 1,
    width: "100%",
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#EBEAEF",
    padding: 3,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "transparent",
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontFamily: FONTS.bold,
    color:COLORS.second
  },
});

export default Home;

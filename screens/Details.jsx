import React, { useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
//-------------------------import theme:
import { COLORS, FONTS, SIZES } from "../constants";
// -------------------------------translation :
import "../utils/i18n";
import { t } from "i18next";
import parking from "../assets/imagesI/parking2.jpg";
import { useState } from "react";
import axios from "axios";
import CategoryList from "../components/CategoryListDetails";
import AboutParking from "../components/AboutParking";
import MediaParking from "../components/MediaParking";
import ServicesParking from "../components/ServicesParking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import profile from "../assets/imagesI/user.png";
import { useTheme } from "react-native-paper";
import { IconButton } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import { AirbnbRating } from "react-native-elements";
const DetailsScreen = ({ navigation, route }) => {
  <StatusBar style="white" animated={true} />;
  const { id, parkdata } = route.params;
  const { image, title, address, price } = parkdata;
  const [park, setPark] = useState({});
  const [parkReviews, setParkReviews] = useState([]);
  const [authReviews, setAuthReviews] = useState({});
  const [Favorite, setFavorite] = useState({});
  const [loading, setLoading] = useState(true);
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ["About", "Services", "Media", "Reviews"];
  const [panel, setPanel] = useState("About");
  const [reviews, setReviews] = useState(false);
  const [comment, setcomment] = useState("");
  const [review, setReview] = useState(1);
  const theme = useTheme();
  const { colors } = theme;
  const commentSheet = useRef();
  const TostMessage = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };
  
  useEffect(() => {
    getParkByid();
    if (reviews) {
      DisplayReviwsByid();
      commentSheet.current.open();
      DisplayReviwsAuthByid();
    }
  }, [id, reviews]);
  const getParkByid = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get(`http://192.168.1.16:8080/v2/parking/byid/${id}/about`, {
            headers: {
              Authorization: `Bearer ${accees ? accees : ""}`,
            },
          })
          .then((response) => {
            setPark(response.data);
            console.log(response.data.description);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };

  const ManageFavoritekByid = () => {
    console.log("sdgfsgdfgdgd");
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get(`http://192.168.1.16:8080/v2/parking/byid/${id}/favorite`, {
            headers: {
              Authorization: `Bearer ${accees ? accees : ""}`,
            },
          })
          .then((response) => {
            setPark({
              ...park,
              favorite: !park.favorite,
            });
            setLoading(false);
          })
          .catch((error) => {
            TostMessage("You need To be logged in");
          });
      })
      .catch((error) => {
        console.log("kjhkjh;hkh");
      });
  };
  


  const DisplayReviwsByid = () => {
    axios
      .get(`http://192.168.1.16:8080/v2/parking/byid/${id}/reviews`)
      .then((resopnse) => {
        if (resopnse.data?.reviews) {
          setParkReviews(resopnse.data.reviews);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DisplayReviwsAuthByid = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get(
            `http://192.168.1.16:8080/v2/reviews/parking/find/${id}/byauth`,
            {
              headers: {
                Authorization: `Bearer ${accees ? accees : ""}`,
              },
            }
          )
          .then((response) => {
            setAuthReviews(response.data);
            setLoading(false);
          })
          .catch((error) => {
            //display popup
          });
      })
      .catch();
  };

  const handelpost = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        const datasend = {
          reviews: {
            parking: id,
            description: comment,
            rating: review,
          },
          metaData: {},
          timeStamps: Date.now(),
        };
        if (comment != "") {
          axios
            .post(
              "http://192.168.1.16:8080/v2/reviews/parking/manage/byid",
              datasend,
              {
                headers: {
                  Authorization: `Bearer ${accees ? accees : ""}`,
                },
              }
            )
            .then((response) => {
              setcomment("");
              const resp = response.data;
              const data = parkReviews.find(
                (rating) => rating.id === response.data?.id
              );
              const olddata = parkReviews.filter(
                (rating) => rating.id != response.data?.id
              );
              if (data) {
                setParkReviews([resp, ...olddata]);
                // console.log("exist");
              } else {
                setParkReviews([response.data, ...parkReviews]);
                // console.log("not exist");
              }
              // console.log(response.data);
              // console.log(parkReviews);
            })
            .catch((error) => {
              //display popup
            });
        } else {
          console.log("errur");
        }
      })
      .catch();
  };

  function convertToRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const timeDifference = now - date;
    const secondsDifference = Math.floor(timeDifference / 1000);
    if (secondsDifference < 60) {
      return `${secondsDifference}s ago`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference}m ago`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference}h ago`;
    } else {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference}d ago`;
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((accessToken) => {
      if (accessToken !== null) {
        // If 'accessToken' exists, set 'isLoggedIn' to true
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

 
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        <ImageBackground style={{ flex: 0.7 }} source={parking}>
          {/* header: */}
          <View style={style.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.second}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          {/* image: */}
          <View style={style.imageDetails}>
            <Text
              style={{
                width: "70%",
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.white,
                marginBottom: 20,
              }}
            >
              {parkdata.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={30} color={COLORS.yellow} />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {" "}
                {park.rating}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={style.detailsContainer}>
          <CategoryList
            categories={categories}
            setPanel={setPanel}
            catergoryIndex={catergoryIndex}
            setCategoryIndex={setCategoryIndex}
            setReviews={setReviews}
          />

          {/* favorite */}
          <View style={style.iconContainer}>
            {park.favorite ? (
              <Icon
                name="favorite"
                color={"red"}
                size={30}
                onPress={ManageFavoritekByid}
              />
            ) : (
              <Icon
                name="favorite"
                color={"black"}
                size={30}
                onPress={ManageFavoritekByid}
              />
            )}
          </View>
          {panel === "About" && (
            <AboutParking
              id={id}
              street={parkdata.street}
              address={parkdata.address}
              description={parkdata.description}
            />
          )}
          {panel === "Services" && <ServicesParking id={id} />}
          {panel === "Media" && <MediaParking id={id} />}
        </View>

        {/* --------------------------footer: */}
        <View style={style.footer}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              10
              {/* {park.price} */}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.black,
                marginLeft: 2,
              }}
            >
              Dh/H
            </Text>
          </View>
          <View>
            <TouchableOpacity style={style.bookNowBtn}>
              <Text style={style.textButton}>{t("Reserve")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* -----REview: */}
      <RBSheet
        ref={commentSheet}
        closeOnDragDown={true}
        onClose={() => setReviews(false)}
        height={480}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderColor,
            paddingBottom: 5,
          }}
        >
          <Text style={{ ...FONTS.h6, color: colors.title, flex: 1 }}>
            Comments
          </Text>
          <IconButton
            onPress={() => {
              setReviews(false), commentSheet.current.close();
            }}
            icon={() => <FeatherIcon color={colors.title} size={22} name="x" />}
          />
        </View>
        <ScrollView>
          <TouchableOpacity activeOpacity={1}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.borderColor,
                alignItems: "flex-start",
              }}
            >
              <Image
                source={profile}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 35,
                  marginTop: 1, // Adjust this value as needed for vertical alignment
                }}
              />
              <View style={{ marginLeft: 9, flex: 1 }}>
                {/* {parkReviews.map((data, index) => {
                  return (
                    <Text
                      key={index}
                      style={{ ...FONTS.font, color: colors.title }}
                    >
                      {data.auth.firstName} {data.auth.lastName}
                    </Text>
                  );
                })} */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    style={{
                      ...FONTS.font,
                      color: colors.title,
                      paddingHorizontal: 5,
                      flex: 1,
                      height: 48,
                      marginRight: 10, // Add margin to separate input and button
                      bottom: 10,
                    }}
                    placeholder="Add a comment..."
                    placeholderTextColor={colors.textLight}
                    value={comment}
                    onChangeText={(text) => setcomment(text)}
                    editable={isLoggedIn}
                  />
                  <TouchableOpacity
                    style={{ padding: 5, top: 1 }}
                    onPress={handelpost}
                  >
                    <Text
                      style={{
                        ...FONTS.h6,
                        color: COLORS.primary3,
                        bottom: 10,
                      }}
                    >
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <AirbnbRating
                    starContainerStyle={{ bottom: 25, right: 15 }}
                    size={25}
                    value={review}
                    showRating={false}
                    defaultRating={review}
                    onFinishRating={(rating) => setReview(rating)}
                  />
                </View>
              </View>
            </View>

            <View>
              {parkReviews
                .sort((a, b) => {
                  a?.id - b?.id;
                })
                .map((data, index) => {
                  if (authReviews?.id === data?.id) {
                    parkReviews.splice(index, 1);
                    parkReviews.unshift(data);
                  }
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 15,
                          paddingVertical: 12,
                        }}
                      >
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 30,
                            marginRight: 10,
                            marginTop: 4,
                          }}
                          source={profile}
                        />
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{ ...FONTS.fontSm, color: colors.text }}
                            >
                              {data.auth.firstName} {data.auth.lastName}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 3,
                                paddingHorizontal: 3,
                                marginRight: 8,
                              }}
                            >
                              <AirbnbRating
                                defaultRating={data.rating}
                                size={15}
                                showRating={false}
                                isDisabled
                              />

                              <View
                                style={{
                                  height: 4,
                                  width: 4,
                                  borderRadius: 3,
                                  backgroundColor: colors.textLight,
                                  opacity: 0.5,
                                  marginHorizontal: 6,
                                }}
                              />
                              <Text
                                style={{
                                  ...FONTS.fontXs,
                                  color: colors.textLight,
                                }}
                              >
                                {convertToRelativeTime(data.createdAt)}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <Text style={{ ...FONTS.font, color: colors.title }}>
                            {data.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
    </>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    backgroundColor: COLORS.second,
    padding: SIZES.small,
    width: 150,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#EBEAEF",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
  },
});

export default DetailsScreen;

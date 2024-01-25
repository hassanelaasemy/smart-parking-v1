import { View, Text, TouchableOpacity ,Image, ScrollView } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";
import { SvgXml } from "react-native-svg";
import { COLORS, FONTSI, ICONS, SIZESI } from "../constants/theme";
import { useState } from "react";
import { colors } from "react-native-elements";

import parkingimg from "../assets/imagesI/parking3.jpg";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageViewer from "react-native-image-zoom-viewer";
const postImages = [
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
  {
      url: '',
      props : {
          source : parkingimg
      }
  },
]
const MediaParking = () => {
  const [postView, setPostView] = useState("grid");
  const [postIndex , setPostIndex] = useState(0);
  const [postModal , setPostModal] = useState(false);
 
  return (
    <View >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
      >
        <Text style={[FONTSI.h6, { flex: 1, color: colors.title }]}>
          Images Parking
        </Text>

        <Ripple
          onPress={() => setPostView("grid")}
          style={{
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            opacity: postView === "grid" ? 1 : 0.5,
          }}
        >
          <SvgXml xml={ICONS.grid} />
        </Ripple>
        <Ripple
          onPress={() => setPostView("list")}
          style={{
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            opacity: postView === "list" ? 1 : 0.5,
          }}
        >
          <SvgXml xml={ICONS.list} />
        </Ripple>
      </View>

      <ScrollView>
         <View style={{flexDirection:'row',flexWrap:'wrap', width:430}}>
                            {postImages.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={[{
                                            width:(SIZESI.width - 30) / 3,
                                            height:(SIZESI.width - 30) / 3,
                                            marginBottom:6,
                                        },postView === 'list' && {
                                            width:'100%',
                                            height: 250,
                                            marginBottom:10,
                                        }]}
                                    >
                                        <TouchableOpacity
                                            onLongPress={() => refRBSheet.current.open()}
                                            onPress={()=> {setPostIndex(index);setPostModal(true)}}
                                            style={{
                                                marginHorizontal:3,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:'100%',
                                                    borderRadius:SIZESI.radius,
                                                }}
                                                source={data.props.source}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
      </ScrollView>
     
      {/* <Modal visible={postModal} transparent={true}>
                            <SafeAreaView style={{flex:1}}>
                                <ImageViewer
                                    index={postIndex}
                                    imageUrls={postImages}
                                    enableSwipeDown={true}
                                    onSwipeDown={()=> setPostModal(false)}
                                    renderHeader={()=>(
                                        <View style={{alignItems:'flex-end'}}>
                                            <TouchableOpacity 
                                                style={{
                                                    height:50,
                                                    width:50,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                }}
                                                onPress={()=> setPostModal(false)}>
                                                <SvgXml stroke={COLORS.white} xml={ICONS.close}/>
                                            </TouchableOpacity>    
                                        </View>
                                    )}
                                />
                            </SafeAreaView>
                        </Modal> */}

    </View>
  );
};

export default MediaParking;

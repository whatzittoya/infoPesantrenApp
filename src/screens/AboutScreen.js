import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import Header from "../components/Header";
import infomasjid from "../api/infomasjid";
const OpenWhatsapp = () => {
  // if (mobile) {
  //   if (msg) {
  let url =
    "whatsapp://send?text=Assalamu%27alaikum%2C%20perkenalkan%20nama%20saya%20&phone=6285264612989";
  Linking.openURL(url);
  // .then((data) => {
  //   console.log("WhatsApp Opened successfully " + data);
  // })
  // .catch(() => {
  //   alert("Make sure WhatsApp installed on your device");
  // });
  // } else {
  // alert("Please enter message to send");
  //   }
  // } else {
  // alert("Please enter mobile no");
  // }
};
const AboutScreen = () => {
  const [result, setResult] = useState(null);
  const getResult = async () => {
    const response = await infomasjid.get(`/about`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult();
  }, []);
  if (!result) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Tentang Kami"}></Header>
      <WebView
        originWhitelist={["https://*", "http://*", "whatsapp://*"]}
        source={{
          html:
            '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' +
            result.about +
            "</body></html>",
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchableOpacityStyle}
        onPress={OpenWhatsapp}
      >
        <Image
          source={{
            uri: "http://infomasjid.my.id/img/Chat-via-whatsapp.png",
          }}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 180,
    height: 90,
    //backgroundColor:'black'
  },
});

export default AboutScreen;

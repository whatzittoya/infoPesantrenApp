import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { WebView } from "react-native-webview";

import infomasjid from "../api/infomasjid";

const BeritaShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await infomasjid.get(`/berita/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);
  if (!result) {
    return null;
  }
  return (
    <View style={style.container}>
      <Text style={style.header}>{result.judul} </Text>
      <Text style={style.subtitle}>
        Tanggal {result.tgl_berita} oleh {result.masjids.nama}
      </Text>
      <WebView
        originWhitelist={["*"]}
        source={{
          html:
            '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' +
            result.deskripsi +
            "</body></html>",
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 10,
    fontStyle: "italic",
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default BeritaShowScreen;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import infomasjid from "../api/infomasjid";

const MasjidShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await infomasjid.get(`/masjid/${id}`);
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
      <Text style={style.header}>{result.nama} </Text>
      <Image style={style.image} source={{ uri: result.image_url }}></Image>
      <Text style={style.header1}>Alamat </Text>
      <Text style={style.text}>{result.alamat} </Text>
      <Text style={style.header1}>Deskripsi </Text>
      <Text style={style.text}>{result.deskripsi} </Text>
      <Text style={style.header1}>Nomor Rekening </Text>
      <Text style={style.text}>{result.norek} </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header1: {
    fontSize: 15,
    paddingTop: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,

    textAlign: "justify",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default MasjidShowScreen;

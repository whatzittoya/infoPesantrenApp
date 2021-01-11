import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { ListStyles } from "../styles/global";

const MasjidResultsDetail = ({ result }) => {
  return (
    <View style={style.container}>
      <Image style={style.image} source={(result.foto == null) ? require('../../assets/logo.png') : { uri: (result.image_url) }}></Image>
      <View style={style.subcontainer}>
        <Text style={style.name}>{result.nama}</Text>
        <Text style={style.detail}>{result.alamat}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: ListStyles.container,
  subcontainer: ListStyles.subcontainer,
  image: ListStyles.image,
  name: ListStyles.name,
  detail: ListStyles.detail,
});

export default MasjidResultsDetail;

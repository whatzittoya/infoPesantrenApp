import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { ListStyles } from "../styles/global";
const ResultsDetail = ({ result }) => {

  return (
    < View style={style.container} >
      <Image
        style={style.image}
        source={
          (result.masjids.foto == null) ? require('../../assets/logo.png') :
            { uri: result.masjids.image_url }
        }
      ></Image>
      <View style={style.subcontainer}>
        <Text style={style.name}>{result.judul}</Text>
        <Text style={style.tanggal}>Tanggal {result.tgl_berita}</Text>
      </View>
    </View >
  );
};

const style = StyleSheet.create({
  container: ListStyles.container,
  subcontainer: ListStyles.subcontainer,
  image: ListStyles.image,
  name: ListStyles.name,
  tanggal: ListStyles.tanggal,
});

export default ResultsDetail;

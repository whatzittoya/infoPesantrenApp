import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Picker,
  TouchableOpacity,
  Button,
} from "react-native";
import { ButtonColors } from "../styles/global";
import { withNavigation } from "react-navigation";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo.png")}
      ></Image>
      <Text style={styles.header}>InfoPesantren</Text>
      <Text style={styles.QuoteStyles}></Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChooseMasjid", { mode: "firstChoose" })
        }
      >
        <View style={styles.btnContainer}>
          <Text style={styles.btnLanjutkanStyle}>Pilih Pesantren</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 3,
  },
  QuoteStyles: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignSelf: "center",
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center",
  },
  pickStyles: {
    width: 200,
    height: 50,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "black",
    borderBottomWidth: 0,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#E7EAED",
  },
  MasjidOption: {
    height: 50,
    width: 200,
  },
  btnContainer: {
    backgroundColor: ButtonColors.primary,
    borderRadius: 10,
    alignSelf: "center",
    width: 300,
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 15,
  },
  btnLanjutkanStyle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  optionText: {
    letterSpacing: 1,
  },
});

export default withNavigation(WelcomeScreen);

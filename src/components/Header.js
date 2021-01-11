import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { colorTheme } from "../styles/global";

const Header = ({ title = "Info Masjid" }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: colorTheme.primary,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#333",
    letterSpacing: 1,
  },
});
export default Header;

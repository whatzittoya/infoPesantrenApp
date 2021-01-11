import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BeritaCategory = ({ title, selected, clicked }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => clicked()}>
        {title === "Pengumuman" ? (
          <AntDesign
            name="notification"
            style={selected ? styles.iconPickStyle : styles.iconStyle}
          />
        ) : title === "Keuangan" ? (
          <MaterialCommunityIcons
            name="finance"
            style={selected ? styles.iconPickStyle : styles.iconStyle}
          />
        ) : title === "Pembangunan" ? (
          <MaterialCommunityIcons
            name="floor-plan"
            style={selected ? styles.iconPickStyle : styles.iconStyle}
          />
        ) : title === "Program" ? (
          <MaterialCommunityIcons
            name="progress-check"
            style={selected ? styles.iconPickStyle : styles.iconStyle}
          />
        ) : title === "Semua" ? (
          <Feather
            name="list"
            style={selected ? styles.iconPickStyle : styles.iconStyle}
          />
        ) : null}
      </TouchableOpacity>

      <Text style={styles.addStyles}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconPickStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
    backgroundColor: "#3F4448",
    color: "#fff",
    fontSize: 20,
  },
  iconStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
    fontSize: 20,
    color: "#717171",
  },
  addStyles: {
    fontSize: 10,
    alignSelf: "center",
  },
});

export default BeritaCategory;

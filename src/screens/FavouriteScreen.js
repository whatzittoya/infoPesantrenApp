import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FavouriteScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Berita Favourite</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
  },
});

export default FavouriteScreen;

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FollowScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Mesjid yang di ikuti</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
  },
});

export default FollowScreen;

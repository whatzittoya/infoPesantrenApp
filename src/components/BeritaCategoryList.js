import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import BeritaCategory from "../components/BeritaCategory";
import { Context } from "../context/BeritaContext";

const BeritaCategoryList = (category, setCategory) => {
  const { state, setSelectedCategory } = useContext(Context);
  return (
    <View style={styles.CatContainer}>
      <BeritaCategory
        title="Pengumuman"
        selected={state.category.name === "Pengumuman"}
        clicked={() => {
          setSelectedCategory({ name: "Pengumuman", value: "Pengumuman" });
        }}
      />
      <BeritaCategory
        title="Keuangan"
        selected={state.category.name === "Keuangan"}
        clicked={() => {
          setSelectedCategory({ name: "Keuangan", value: "Laporan Keuangan" });
        }}
      />
      <BeritaCategory
        title="Pembangunan"
        selected={state.category.name === "Pembangunan"}
        clicked={() => {
          setSelectedCategory({
            name: "Pembangunan",
            value: "Perencanaan Pembangunan",
          });
        }}
      />
      <BeritaCategory
        title="Program"
        selected={state.category === "Program"}
        clicked={() => {
          setSelectedCategory({ name: "Program", value: "Program Masjid" });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  CatContainer: globalStyles.CatContainer,
});
export default BeritaCategoryList;

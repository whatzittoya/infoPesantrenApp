import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import MasjidResultsList from "../components/MasjidResultsList";
import { Context } from "../context/MasjidContext";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { colorTheme } from "../styles/global";

const MasjidScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const { state, getMasjid, searchMasjid } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMasjid(() => {
      setLoading(false);
    });
    // console.log(state);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Daftar Masjid"}></Header>
      <View style={{ backgroundColor: colorTheme.primary }}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => {
            setLoading(true);
            searchMasjid(term, () => {
              setLoading(false);
            });
          }}
        ></SearchBar>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <MasjidResultsList
          results={state.masjid_all}
          title=""
          setLoading={setLoading}
        ></MasjidResultsList>
      </SafeAreaView>
      {loading && <Spinner></Spinner>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MasjidScreen;

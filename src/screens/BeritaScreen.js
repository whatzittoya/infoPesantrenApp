import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import BeritaCategoryList from "../components/BeritaCategoryList";
import { globalStyles } from "../styles/global";
import { Context } from "../context/BeritaContext";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { colorTheme } from "../styles/global";

const BeritaScreen = () => {
  const [term, setTerm] = useState();
  const { state, getBerita, setSelectedCategory, searchBerita } = useContext(
    Context
  );
  const [loading, setLoading] = useState(false);
  const filterBerita = () => {
    if (state.category.value === "All") {
      return state.berita_all.filter((resultBerita) => {
        return resultBerita;
      });
    } else {
      return state.berita_all.filter((resultBerita) => {
        return resultBerita.kategori_berita === state.category.value;
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getBerita(() => {
      setLoading(false);
    });
    setSelectedCategory({ name: "Pengumuman", value: "Pengumuman" });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Berita"></Header>
      <View style={{ backgroundColor: colorTheme.primary }}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => {
            setLoading(true);
            searchBerita(term, () => {
              setLoading(false);
            });
          }}
        ></SearchBar>
      </View>

      {/* {errorMessage ? <Text>{errorMessage}</Text> : null} */}
      {/*<Text>{Constants.installationId} </Text> */}
      <BeritaCategoryList />

      <SafeAreaView style={{ flex: 1 }}>
        <ResultsList results={filterBerita()} title="Pengumuman"></ResultsList>
      </SafeAreaView>
      {loading && <Spinner></Spinner>}
    </View>
  );
};

const styles = StyleSheet.create({
  CatContainer: globalStyles.CatContainer,
  container: {
    flex: 1,
    backgroundColor: "#E7EAED",
  },
});

export default BeritaScreen;

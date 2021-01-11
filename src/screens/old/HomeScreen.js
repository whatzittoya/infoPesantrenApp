import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import MasjidHeader from "../../components/MasjidHeaderComponent";
import { globalStyles } from "../../styles/global";
import ResultsList from "../../components/ResultsList";
import BeritaCategoryList from "../../components/BeritaCategoryList";
import { Context as BeritaContext } from "../../context/BeritaContext";
import { Context as MasjidContext } from "../../context/MasjidContext";
import Spinner from "../../components/Spinner";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    state,
    getBerita,
    getBeritaProfile,
    setSelectedCategory,
  } = useContext(BeritaContext);
  const { state: stateMasjid, getMasjid, getMasjidProfile } = useContext(
    MasjidContext
  );

  const [category, setCategory] = useState("Pengumuman");
  useEffect(() => {
    setLoading(true);
    getBerita(() => {
      getBeritaProfile(() => {
        setLoading(false);
      });
    });
    getMasjid(() => {
      getMasjidProfile();
    });

    setSelectedCategory({ name: "Semua", value: "All" });
  }, []);
  const filterBerita = () => {
    if (state.category.value === "All") {
      return state.berita_profile.filter((resultBerita) => {
        return resultBerita;
      });
    } else {
      return state.berita_profile.filter((resultBerita) => {
        return resultBerita.kategori_berita === state.category.value;
      });
    }
  };
  function selectedMasjid() {
    return stateMasjid.masjid_profile.find1((item) => {
      return item.selected;
    });
  }
  if (!stateMasjid) return null;
  return (
    <View style={{ flex: 1 }}>
      <MasjidHeader
        title="mesjid Header"
        results={selectedMasjid()}
        clicked={setCategory}
      />
      <BeritaCategoryList />
      <SafeAreaView keyboardShouldPersistTaps="always">
        <ResultsList results={filterBerita()} title="Pengumuman"></ResultsList>
      </SafeAreaView>
      {loading && <Spinner></Spinner>}
    </View>
  );
};

const styles = StyleSheet.create({
  CatContainer: globalStyles.CatContainer,
  beritaStyle: {
    marginTop: 10,
  },
});

export default HomeScreen;

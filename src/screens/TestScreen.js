import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import ResultsList from "../components/ResultsList";
import { Context as BeritaContext } from "../context/BeritaContext";
import { Context as MasjidContext } from "../context/MasjidContext";

const windowHeight = Dimensions.get("window").height;
const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const styles = StyleSheet.create({
  headerCotainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 45,
    flexDirection: "row",

    backgroundColor: "black",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: {
    width: 50,
    height: 50,
    padding: 20,
    marginRight: 10,
    borderRadius: 30,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  tabTextContainerStyle: {
    backgroundColor: "transparent",
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: "#FFC106",
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "black",
  },
  tabWrapperStyle: {
    paddingVertical: 10,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: 10,
  },
  contentText: {
    fontSize: 16,
  },
});

const CutomHeaderScreen = () => {
  const {
    state,
    getBerita,
    getBeritaProfile,
    setSelectedCategory,
  } = useContext(BeritaContext);
  const { state: stateMasjid, getMasjid, getMasjidProfile } = useContext(
    MasjidContext
  );

  const filterBerita = (category) => {
    if (category === "Semua") {
      return state.berita_profile.filter((resultBerita) => {
        return resultBerita;
      });
    } else {
      return state.berita_profile.filter((resultBerita) => {
        return resultBerita.kategori_berita === category;
      });
    }
  };
  function selectedMasjid() {
    return stateMasjid.masjid_profile.find((item) => {
      return item.selected;
    });
  }

  const renderContent = (x) => {
    return (
      <View style={styles.contentContainer}>
        <ResultsList results={filterBerita(x)}></ResultsList>
      </View>
    );
  };

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.headerCotainer}>
        <Animated.View style={{ opacity }}>
          <View style={styles.headerWrapper}>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={{
                uri:
                  "http://infomasjid.my.id/storage/foto_masjid/WZ0yhK3CrO0JrhsQw2ModEKaTQrrz2vizlxLFAEk.jpeg",
              }}
            />
            <Text style={styles.headerText}>{selectedMasjid().nama}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={{
        uri: "http://infomasjid.my.id/" + selectedMasjid().foto,
      }}
      backgroundColor={"black"}
      header={renderHeader}
      title={selectedMasjid().nama + "\n" + selectedMasjid().alamat}
      titleStyle={styles.titleStyle}
      foregroundImage={{}}
      tabs={[
        {
          title: "Semua",
          content: renderContent("Semua"),
        },
        {
          title: "Pengumuman",
          content: renderContent("Pengumuman"),
        },
        {
          title: "Laporan Keuangan",
          content: renderContent("Laporan Keuangan"),
        },
        {
          title: "Perencanaan Pembangunan",
          content: renderContent("Perencanaan Pembangunan"),
        },
        {
          title: "Program Masjid",
          content: renderContent("Program Masjid"),
        },
      ]}
      tabTextContainerStyle={styles.tabTextContainerStyle}
      tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
      tabTextStyle={styles.tabTextStyle}
      tabTextActiveStyle={styles.tabTextActiveStyle}
      tabWrapperStyle={styles.tabWrapperStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        { useNativeDriver: false }
      )}
    />
  );
};
export default CutomHeaderScreen;

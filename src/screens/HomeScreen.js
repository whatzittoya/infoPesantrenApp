import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import ResultsList from "../components/ResultsList";
import { Context as BeritaContext } from "../context/BeritaContext";
import { Context as MasjidContext } from "../context/MasjidContext";
import Spinner from "../components/Spinner";
import { colorTheme } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const CutomHeaderScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    state,
    getBerita,
    setSelectedCategory,
    setBeritaProfile,
  } = useContext(BeritaContext);
  const { state: stateMasjid, getMasjid } = useContext(MasjidContext);
  useEffect(() => {
    setLoading(true);
    getBerita(() => {
      setLoading(false);
    });
    getMasjid(() => {
      setBeritaProfile(selectedMasjid().masjid_id, () => {});
    });

    setSelectedCategory({ name: "Semua", value: "All" });
    setBeritaProfile(selectedMasjid().masjid_id);
  }, []);

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
        <ResultsList
          results={filterBerita(x)}
          refresh={() => {
            setBeritaProfile(selectedMasjid().masjid_id, () => {});
          }}
        ></ResultsList>
      </View>
    );
  };

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      alignSelf: "flex-start",
      flex: 2,
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
              source={
                selectedMasjid().foto == null
                  ? require("../../assets/logo.png")
                  : {
                      uri: selectedMasjid().image_url,
                    }
              }
            />
            <Text style={styles.headerText}>
              {selectedMasjid().nama.substring(0, 20) +
                (selectedMasjid().nama.length > 20 ? "..." : "")}
            </Text>
          </View>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MasjidProfileScreen");
          }}
        ></TouchableOpacity>
        {loading && <Spinner></Spinner>}
      </View>
    );
  };
  if (!selectedMasjid()) {
    return null;
  }
  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={
        selectedMasjid().foto == null
          ? require("../../assets/logo.png")
          : {
              uri: selectedMasjid().image_url,
            }
      }
      backgroundColor={colorTheme.primary}
      headerHeight={80}
      header={renderHeader}
      title={selectedMasjid().nama + "\n" + selectedMasjid().alamat}
      titleStyle={styles.titleStyle}
      foregroundImage={{}}
      tabs={[
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
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY.y,
              },
            },
          },
        ],
        { useNativeDriver: false }
      )}
    />
  );
};
const styles = StyleSheet.create({
  headerCotainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 30,
    flexDirection: "row",
    backgroundColor: colorTheme.primary,
    justifyContent: "space-between",
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
    borderBottomColor: "transparent",
    borderBottomWidth: 5,
    marginBottom: -10,
  },
  tabTextContainerActiveStyle: {
    // backgroundColor: colorTheme.pDark,
    borderBottomColor: colorTheme.pDark,
    borderBottomWidth: 5,
    marginBottom: -10,
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colorTheme.text,
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colorTheme.text,
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
  setting: {
    fontSize: 30,
    color: colorTheme.text,
    paddingTop: 10,
  },
});
export default withNavigation(CutomHeaderScreen);

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import MasjidResultsList from "../components/MasjidResultsList";
import SearchBar from "../components/SearchBar";
import { Context } from "../context/MasjidContext";
import { ButtonColors } from "../styles/global";
import Spinner from "../components/Spinner";

const MasjidChooseScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const {
    state,
    getMasjid,
    searchMasjid,
    setDefaultMasjidProfile,
  } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const mode = navigation.getParam("mode");

  return (
    <View style={{ flex: 1 }}>
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
      {mode === "firstChoose" ? (
        <Button
          title="Simpan"
          onPress={() => {
            setDefaultMasjidProfile();
            navigation.navigate("Home");
          }}
        ></Button>
      ) : null}
      <SafeAreaView style={{ flex: 1 }}>
        <MasjidResultsList
          results={state.masjid_all}
          title=""
          mode="choose"
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
  buttonContainer: {
    padding: 10,
    width: 90,
    alignSelf: "flex-start",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default MasjidChooseScreen;

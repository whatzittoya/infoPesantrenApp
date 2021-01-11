import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import MasjidResultsList from "../components/MasjidResultsList";
import { Context } from "../context/MasjidContext";
import { ButtonColors } from "../styles/global";
import Spinner from "../components/Spinner";
import { NavigationActions } from "react-navigation";

const MasjidProfileScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const { state, getMasjid, searchMasjid } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("profile");
  return (
    <View>
      <View style={styles.buttonContainer}>
        {mode == "profile" ? (
          <Button
            title="Ubah"
            color={ButtonColors.warning}
            onPress={() => {
              setMode("manage");
            }}
          ></Button>
        ) : (
          <Button
            title="Selesai"
            color={ButtonColors.primary}
            onPress={() => {
              setMode("profile");
            }}
          ></Button>
        )}
      </View>

      <SafeAreaView>
        <MasjidResultsList
          results={state.masjid_profile}
          title=""
          mode={mode}
          setLoading={setLoading}
        ></MasjidResultsList>
      </SafeAreaView>
      <Button
        title="Tambah Masjid"
        color={ButtonColors.primary}
        onPress={() => {
          navigation.navigate("MasjidChooseScreen", { mode: "choose" });
        }}
      ></Button>
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

export default MasjidProfileScreen;

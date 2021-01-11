import React, { useEffect, useContext, useState } from "react";
import {
  ActivityIndicator,
  Text,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { Context as BeritaContext } from "../context/BeritaContext";
import { Context as MasjidContext } from "../context/MasjidContext";
import { Context as UserContext } from "../context/UserContext";
import Constants from "expo-constants";

import { colorTheme } from "../styles/global";
const AuthLoadingScreen = ({ navigation }) => {
  const [selectedMasjid, setSelectedMasjid] = useState();
  const { getBerita, setSelectedCategory, setBeritaProfile } = useContext(
    BeritaContext
  );
  const { state: stateUser, setUser, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { state: stateMasjid, getMasjid, getMasjidProfile } = useContext(
    MasjidContext
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getBerita(() => {
      if (mounted) setLoading(false);
    });
    getMasjid();
    setSelectedCategory({ name: "Semua", value: "All" });
    const device_id = Constants.deviceId + "1";
    login(device_id, (data) => {
      if (data.result === "choose_mesjid") {
        navigation.navigate("Auth");
      } else if (data.result === "choose_mesjid_exists") {
        navigation.navigate("Auth");
      } else {
        getMasjidProfile(data.masjid);
        navigation.navigate("App");
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />

      <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
      <Text style={styles.welcome}>Selamat Datang di InfoPesantren</Text>
      <Text style={styles.instructions}></Text>
      <Text style={styles.instructions}></Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorTheme.primary,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#F5FCFF",
  },
  instructions: {
    textAlign: "center",
    color: "#F5FCFF",
    marginBottom: 5,
  },
});
export default AuthLoadingScreen;

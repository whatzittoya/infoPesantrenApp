import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { withNavigation } from "react-navigation";
import MasjidResultsDetail from "./MasjidResultsDetail";
import { ButtonColors, colorTheme } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { Context as MasjidContext } from "../context/MasjidContext";
import { Context as BeritaContext } from "../context/BeritaContext";
import { Context as UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

const MasjidResultsList = ({
  title,
  results,
  navigation,
  mode = "",
  setLoading,
}) => {
  if (!results.length) {
    return <Text>Data Kosong</Text>;
  }
  const {
    state: stateMasjid,
    setMasjidProfile,
    deleteMasjidProfile,
    addMasjidProfile,
  } = useContext(MasjidContext);
  const { state: stateBerita, setBeritaProfile } = useContext(BeritaContext);
  const { state: stateUser } = useContext(UserContext);
  const renderButtonProfile = (item) => {
    if (item.selected && mode != "") {
      return (
        <View style={styles.buttonContainer}>
          <Feather name="check" size={35} color={colorTheme.primary}></Feather>
        </View>
      );
    } else if (mode == "profile") {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="Pilih"
            color={ButtonColors.primary}
            onPress={() => {
              setLoading(true);
              setMasjidProfile(stateUser.user.id, item.masjid_id, () => {
                setBeritaProfile(item.masjid_id);
                setLoading(false);
              });
            }}
          ></Button>
        </View>
      );
    } else if (mode == "manage") {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="Hapus"
            color={ButtonColors.danger}
            onPress={() => {
              setLoading(true);
              deleteMasjidProfile(stateUser.user.id, item.masjid_id, () => {
                setLoading(false);
              });
            }}
          ></Button>
        </View>
      );
    } else return null;
  };
  const excludeProfile = (id) => {
    const res = stateMasjid.masjid_profile.find((item) => {
      return item.masjid_id === id;
    });
    if (res == undefined) {
      return false;
    }
    return res;
  };

  const renderButtonChoose = (item) => {
    if (excludeProfile(item.masjid_id)) {
      return <Text>Diikuti</Text>;
    } else {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="Ikuti"
            color={ButtonColors.primary}
            onPress={() => {
              setLoading(true);
              addMasjidProfile(stateUser.user.id, item.masjid_id, () => {
                setLoading(false);
              });
            }}
          ></Button>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <FlatList
        data={results}
        keyExtractor={(result) => result.masjid_id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.list}>
              <TouchableOpacity
                style={styles.detail}
                onPress={() =>
                  navigation.navigate("MasjidShow", { id: item.masjid_id })
                }
              >
                <MasjidResultsDetail result={item}></MasjidResultsDetail>
              </TouchableOpacity>
              {mode === "profile" || mode === "manage"
                ? renderButtonProfile(item)
                : renderButtonChoose(item)}
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  detail: {
    flex: 2,
  },
  container: {
    justifyContent: "center",
    flexDirection: "column",
  },
  list: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "white",
    marginBottom: 3,
    marginHorizontal: 5,
    borderRadius: 4,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default withNavigation(MasjidResultsList);

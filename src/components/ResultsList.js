import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { withNavigation } from "react-navigation";
import ResultsDetail from "./ResultsDetail";
import Spinner from "../components/Spinner";
const ResultsList = ({ refresh, results, navigation }) => {
  if (!results) {
    emptyComponent;
  }
  const [loading, setLoading] = useState(false);
  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Data berita kosong</Text>
        <Button
          onPress={() => {
            refresh();
          }}
          title="Muat Ulang"
        ></Button>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={results}
        nestedScrollEnabled={true}
        keyExtractor={(result) => result.berita_id.toString()}
        ListEmptyComponent={emptyComponent}
        renderItem={({ item }) => {
          return (
            <View style={styles.list}>
              <TouchableOpacity
                style={styles.detail}
                onPress={() =>
                  navigation.navigate("BeritaShow", { id: item.berita_id })
                }
              >
                <ResultsDetail result={item}></ResultsDetail>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
      {loading && <Spinner></Spinner>}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    marginHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#F4F6F9",
    height: 320,
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
  detail: {
    flex: 2,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 20,
  },
});

export default withNavigation(ResultsList);

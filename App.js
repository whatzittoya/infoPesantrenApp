import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import navigator from "./src/navigation/Navigator";
import SwitchNavigation from "./src/navigation/SwitchNavigation";
import { Provider as BeritaProvider } from "./src/context/BeritaContext";
import { Provider as MasjidProvider } from "./src/context/MasjidContext";
import { Provider as UserProvider } from "./src/context/UserContext";

const App = createAppContainer(SwitchNavigation);

export default () => {
  return (
    <UserProvider>
      <MasjidProvider>
        <BeritaProvider>
          <App></App>
        </BeritaProvider>
      </MasjidProvider>
    </UserProvider>
  );
};
